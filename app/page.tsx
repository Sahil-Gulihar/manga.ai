"use client";

import Link from "next/link";
import { characters, Character } from "./characters"; // Corrected path and import Character type

export default function CharacterSelectionPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-12 text-purple-400">
        Choose Your Companion
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {characters.map(
          (
            character: Character // Added type for character
          ) => (
            <Link
              href={`/chat/${character.id}`}
              key={character.id}
              legacyBehavior
            >
              <a className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform transition-all hover:scale-105 hover:shadow-purple-500/50 flex flex-col items-center p-6 text-center">
                <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border-4 border-purple-500">
                  <img
                    src={character.backgroundImageUrl}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-purple-300 mb-2">
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
