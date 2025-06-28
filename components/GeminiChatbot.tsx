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
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className="fixed inset-0 pointer-events-none flex justify-center md:justify-center">
      {/* Messages Area - Only shows the last AI message, positioned higher */}
      <div className="absolute bottom-[40%] w-full max-w-[calc(100%-4rem)] md:max-w-md lg:max-w-lg xl:max-w-xl space-y-3 overflow-y-auto pb-1 pointer-events-auto max-h-[30vh] md:max-h-[35vh] pl-4 pr-2 md:pl-8">
        {lastAssistantMessage && currentChunk && (
          <div
            key={`${lastAssistantMessage.id}-${currentChunkIndex}`}
            className="flex justify-start" // Assistant messages are typically on the left
          >
            <div
              className="speech-bubble speech-bubble-assistant shadow-md w-full max-w-[90%] md:max-w-[80%] break-words backdrop-blur-md relative cursor-pointer select-none ml-0 md:ml-4"
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
              <p className="text-sm whitespace-pre-wrap break-words w-full">{currentChunk}</p>

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
      <div className="fixed bottom-0 left-0 right-0 pb-4 px-4 pointer-events-auto flex justify-center">
        <div className="w-full max-w-[calc(100%-2rem)] md:max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="relative">
            {/* Enhanced glass effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-2xl backdrop-blur-xl shadow-2xl -z-10" />
            <div className="relative w-full flex items-center bg-white/5 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 shadow-xl">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                ref={textareaRef}
                placeholder="Type your message..."
                rows={1}
                className="flex-grow p-4 pr-14 bg-transparent text-white placeholder-white/80 focus:outline-none resize-none min-h-[56px] max-h-[160px] rounded-xl transition-all duration-300 focus:ring-2 focus:ring-white/30"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.15) transparent',
                  paddingRight: isInputFocused ? '3.5rem' : '3.5rem' // Keep consistent padding
                }}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                {input.trim() ? (
                  <button
                    onClick={() => {
                      setInput('');
                      textareaRef.current?.focus();
                    }}
                    className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/30 flex items-center justify-center"
                    aria-label="Clear input"
                    style={{
                      width: '32px',
                      height: '32px',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                ) : null}
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-transparent text-white hover:text-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none flex-shrink-0 flex items-center justify-center"
                  aria-label="Send message"
                  style={{
                    width: '36px',
                    height: '36px',
                    opacity: isInputFocused || input.trim() ? 1 : 0.5,
                    transform: 'translateY(0)'
                  }}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transform rotate-45 -translate-y-px"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
                {/* Clear chat history button - shows when there are messages */}
                {(lastAssistantMessage || messages.length > 0) && (
                  <button
                    onClick={clearChat}
                    className="p-2 rounded-full text-gray-300 hover:text-red-400 hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-red-400/30"
                    title="Clear chat history"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}