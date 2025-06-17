"use client";

import { useParams } from "next/navigation";
import GeminiChatbot from "@/components/GeminiChatbot";
import { characters, Character } from "@/app/characters";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const params = useParams();
  const characterId = params.characterId as string;
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (characterId) {
      const foundCharacter = characters.find((char) => char.id === characterId);
      setCharacter(foundCharacter);
    }
    setIsLoading(false);
  }, [characterId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading character...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold text-red-500 mb-8">
          Character Not Found
        </h1>
        <p className="text-xl mb-8">
          The character you are looking for does not exist.
        </p>
        <Link href="/" legacyBehavior>
          <a className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition-colors">
            Choose a Character
          </a>
        </Link>
      </div>
    );
  }

  return (
    // Outer container for centering the "mobile-like screen" on desktop
    <div className="min-h-screen flex items-center justify-center bg-gray-900 md:p-4 lg:p-8">
      {/* This div will be the "mobile screen" with the character background */}
      <div
        className="w-full h-screen md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)] md:max-w-sm lg:max-w-md md:rounded-xl md:shadow-2xl bg-cover bg-center bg-no-repeat relative flex flex-col overflow-hidden"
        
        style={{ backgroundImage: `url(${character.backgroundImageUrl})` }}
      >
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20">
          <Link href="/" legacyBehavior>
            <a className="px-3 py-1.5 bg-gray-800 bg-opacity-75 text-white rounded-md hover:bg-opacity-100 transition-opacity text-xs sm:text-sm">
              &larr; Back to Characters
            </a>
          </Link>
        </div>

        {/* Container for the chat UI elements.
            GeminiChatbot uses fixed positioning, so its elements will be positioned
            relative to the viewport, but they will appear *over* this background.
        */}
        <div className="flex-grow flex flex-col items-center justify-end p-0 relative w-full h-full">
          <GeminiChatbot systemPrompt={character.systemPrompt} />
        </div>

        {/* Optional: Character name at the bottom of the "mobile screen" */}
        {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {character.name}
        </div> */}
      </div>
    </div>
  );
}
