"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface GeminiChatbotProps {
  systemPrompt: string;
}

export default function GeminiChatbot({ systemPrompt }: GeminiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setCurrentChunkIndex(0);
  };

  // Function to split long messages into chunks
  const splitMessageIntoChunks = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return [content];

    const words = content.split(" ");
    const chunks = [];
    let currentChunk = "";

    for (const word of words) {
      if ((currentChunk + " " + word).length <= maxLength) {
        currentChunk += (currentChunk ? " " : "") + word;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        currentChunk = word;
      }
    }

    if (currentChunk) chunks.push(currentChunk);
    return chunks;
  };

  const goToNextChunk = useCallback(() => {
    setCurrentChunkIndex((prev) => prev + 1);
  }, []);

  const goToPrevChunk = useCallback(() => {
    setCurrentChunkIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    const updatedMessagesForApi = [...messages, userMessage];
    setMessages(updatedMessagesForApi);

    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          systemPrompt: systemPrompt, // Pass the systemPrompt prop here
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentChunkIndex(0); // Reset to first chunk for new message
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setCurrentChunkIndex(0); // Reset to first chunk for error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const lastAssistantMessage = messages
    .filter((msg) => msg.role === "assistant")
    .pop();

  // Get chunks for the last assistant message
  const messageChunks = lastAssistantMessage
    ? splitMessageIntoChunks(lastAssistantMessage.content)
    : [];

  const currentChunk = messageChunks[currentChunkIndex];
  const hasMoreChunks = currentChunkIndex < messageChunks.length - 1;
  const hasPrevChunks = currentChunkIndex > 0;

  // Keyboard navigation for chunks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const assistantMessage = messages
        .filter((msg) => msg.role === "assistant")
        .pop();

      if (!assistantMessage) return;

      const chunks = splitMessageIntoChunks(assistantMessage.content);
      const hasMore = currentChunkIndex < chunks.length - 1;
      const hasPrev = currentChunkIndex > 0;

      if (e.key === "ArrowRight" && hasMore) {
        e.preventDefault();
        goToNextChunk();
      } else if (e.key === "ArrowLeft" && hasPrev) {
        e.preventDefault();
        goToPrevChunk();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentChunkIndex, messages, goToNextChunk, goToPrevChunk]);

  return (
    <div className="fixed inset-0 p-4 sm:p-6 pointer-events-none">
      {/* Messages Area - Only shows the last AI message, positioned higher */}
      <div className="absolute bottom-[40%] left-1/2 transform -translate-x-1/2 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[470px] space-y-3 overflow-y-auto pb-1 pointer-events-auto md:ml-8 max-h-[25vh]">
        {lastAssistantMessage && currentChunk && (
          <div
            key={`${lastAssistantMessage.id}-${currentChunkIndex}`}
            className="flex justify-start" // Assistant messages are typically on the left
          >
            <div
              className="speech-bubble speech-bubble-assistant shadow-md max-w-full break-words backdrop-blur-md relative cursor-pointer select-none"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;

                if (clickX < width / 2 && hasPrevChunks) {
                  // Clicked on left half
                  goToPrevChunk();
                } else if (clickX >= width / 2 && hasMoreChunks) {
                  // Clicked on right half
                  goToNextChunk();
                }
              }}
            >
              <p className="text-sm whitespace-pre-wrap">{currentChunk}</p>

              {/* Click areas indicators */}
              {(hasMoreChunks || hasPrevChunks) && (
                <>
                  {/* Left click area indicator */}
                  {hasPrevChunks && (
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-20 hover:opacity-40 transition-opacity pointer-events-none">
                      <span className="text-xs">←</span>
                    </div>
                  )}

                  {/* Right click area indicator */}
                  {hasMoreChunks && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-20 hover:opacity-40 transition-opacity pointer-events-none">
                      <span className="text-xs">→</span>
                    </div>
                  )}
                </>
              )}

              {/* Bottom indicators */}
              <div className="flex justify-between items-center mt-1">
                {/* Chunk counter */}
                {messageChunks.length > 1 && (
                  <span className="text-xs opacity-40">
                    {currentChunkIndex + 1}/{messageChunks.length}
                  </span>
                )}

                <div className="flex-1"></div>

                {/* Click to continue indicator */}
                {hasMoreChunks && (
                  <span className="text-xs opacity-50 animate-pulse">
                    click to continue
                  </span>
                )}

                {/* Click for previous indicator */}
                {!hasMoreChunks && hasPrevChunks && (
                  <span className="text-xs opacity-50">
                    click left to go back
                  </span>
                )}
              </div>

              <p className="text-xs opacity-70 mt-1 text-right">
                {/* {lastAssistantMessage.timestamp.toLocaleTimeString()} */}
              </p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Positioned at the very bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl pointer-events-auto">
        <div className="flex items-center space-x-2 bg-black bg-opacity-50 backdrop-blur-md p-3 rounded-xl shadow-xl mx-4 mb-4 sm:mx-0 sm:mb-0">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
            className="flex-grow p-2 bg-transparent text-white placeholder-gray-300 focus:outline-none resize-none min-h-[40px] max-h-[120px]"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Send"
            )}
          </button>
          {/* Clear button: only show if there's an assistant message displayed or any messages in history */}
          {(lastAssistantMessage || messages.length > 0) && (
            <button
              onClick={clearChat}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-500 transition-colors duration-200 focus:outline-none"
              title="Clear Chat"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
