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
    // Outer container with starry background
    <div className="min-h-screen flex items-center justify-center bg-black md:p-4 lg:p-8 relative overflow-hidden">
      {/* Starry Background */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => {
            const size = Math.random() * 2 + 0.5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const opacity = Math.random() * 0.8 + 0.2;
            const animationDelay = Math.random() * 5;
            const animationDuration = Math.random() * 3 + 2;
            
            return (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: 0,
                  animationName: 'twinkle',
                  animationDuration: `${animationDuration}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${animationDelay}s`,
                  animationFillMode: 'both',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* This div will be the "mobile screen" with the character background */}
      <div
        className="w-full h-screen md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)] max-w-[calc(100%-2rem)] md:max-w-md lg:max-w-lg xl:max-w-xl md:rounded-xl md:shadow-2xl bg-cover bg-center bg-no-repeat relative flex flex-col overflow-hidden"
        style={{ 
          backgroundImage: `url(${character.backgroundImageUrl})`
        }}
      >
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20">
          <Link 
            href="/anime" 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/70 hover:bg-black/90 text-white rounded-md transition-all duration-200 text-xs sm:text-sm font-medium backdrop-blur-sm border border-white/10 shadow-sm hover:shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 -ml-0.5">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to Characters</span>
          </Link>
        </div>

        {/* Container for the chat UI elements */}
        <div className="flex-grow flex flex-col items-start justify-end p-0 relative w-full h-full z-10 pl-4 md:pl-8">
          <GeminiChatbot systemPrompt={character.systemPrompt} />
        </div>

        {/* Add the twinkle animation */}
        <style jsx global>{`
          @keyframes twinkle {
            0% { opacity: 0; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(1); }
          }
        `}</style>

        {/* Optional: Character name at the bottom of the "mobile screen" */}
        {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {character.name}
        </div> */}
      </div>
    </div>
  );
}
