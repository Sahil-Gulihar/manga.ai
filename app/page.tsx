"use client";

import Link from "next/link";
import { useState } from "react";
import { characters, Character } from "./characters"; // Corrected path and import Character type

export default function CharacterSelectionPage() {
  const [showNSFW, setShowNSFW] = useState(false);

  // Filter characters based on family mode
  const filteredCharacters = showNSFW
    ? characters.filter((character) => character.isNSFW) // Show only NSFW characters
    : characters.filter((character) => !character.isNSFW); // Show only family-friendly characters

  const toggleFamilyMode = () => {
    setShowNSFW(!showNSFW);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="flex items-center justify-center mb-12">
        <h1 className="text-5xl font-bold text-purple-400 mr-4">
          Choose Your Companion
        </h1>
        <button
          onClick={toggleFamilyMode}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            showNSFW
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {showNSFW ? "🔞 Mature Mode" : "👨‍👩‍👧‍👦 Family Mode"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCharacters.map(
          (
            character: Character // Added type for character
          ) => (
            <Link
              href={`/chat/${character.id}`}
              key={character.id}
              legacyBehavior
            >
              <a
                className={`bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 hover:shadow-purple-500/50 flex flex-col items-center p-6 text-center`}
              >
                <div className={`w-40 h-40 mb-4 rounded-full overflow-hidden border-4 ${character.isNSFW ? "border-red-300" : "border-purple-500"} relative`}>
                  <img
                  src={character.backgroundImageUrl}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  />
                </div>
                <h2
                  className={`text-2xl font-semibold mb-2 ${
                    character.isNSFW ? "text-red-300" : "text-purple-300"
                  }`}
                >
                  {character.name}
                </h2>
                {/* Optional: Add a short description or tagline here */}
                {/* <p className=\"text-sm text-gray-400\"></p> */}
              </a>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
