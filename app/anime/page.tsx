"use client";

import Link from "next/link";
import { useState } from "react";
import { characters, Character } from "../characters";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Heart, Sparkles, Home } from "lucide-react";

export default function CharacterSelectionPage() {
  const [showNSFW, setShowNSFW] = useState(false);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

  // Filter characters based on family mode
  const filteredCharacters = showNSFW
    ? characters.filter((character) => character.isNSFW) // Show only NSFW characters
    : characters.filter((character) => !character.isNSFW); // Show only family-friendly characters

  const toggleFamilyMode = () => {
    setShowNSFW(!showNSFW);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Home Button */}
      <Link
        href="/"
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 hover:bg-purple-800/50 transition-colors duration-300"
        aria-label="Go to home"
      >
        <Home className="w-5 h-5 text-purple-200" />
      </Link>
      {/* Space background with stars */}
      <div className="absolute inset-0">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const opacity = Math.random() * 0.8 + 0.2;
            const animationDelay = Math.random() * 3;

            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: opacity,
                  animation: `twinkle ${Math.random() * 2 + 3}s infinite`,
                  animationDelay: `${animationDelay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Subtle nebula effects */}
        <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-1.5">
              {/* <Sparkles className="w-4 h-4 text-purple-300 mr-2" /> */}
              <span className="text-purple-200 text-sm font-medium tracking-wider">
                CHARACTER SELECTION
              </span>
            </div>
          </div>

          <h1 className="text-6xl font-light bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 tracking-tight">
            Choose Your Companion
          </h1>

          <button
            onClick={toggleFamilyMode}
            className={`inline-flex items-center px-4 py-2 border rounded-lg font-medium transition-all duration-300 ${
              showNSFW
                ? "border-amber-500/50 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400"
                : "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
            } bg-transparent`}
          >
            <Heart className="w-4 h-4 mr-2" />
            {showNSFW ? "Mature Mode" : "Family Mode"}
          </button>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {filteredCharacters.map((character: Character) => {
            const isHovered = hoveredCharacter === character.id;

            // Define color schemes based on character type
            const colorScheme = character.isNSFW
              ? {
                  borderFrom: "#f59e0b", // amber-500
                  borderTo: "#d97706", // amber-600
                  glowColor: "rgba(245,158,11,0.3)", // amber glow
                  ringColor: "ring-amber-300/60",
                  shadowColor: "rgba(251,191,36,0.2)", // amber-300
                }
              : {
                  borderFrom: "#8b5cf6", // purple-500
                  borderTo: "#a855f7", // purple-500 to purple-500
                  glowColor: "rgba(168,85,247,0.3)", // purple glow
                  ringColor: "ring-purple-300/60",
                  shadowColor: "rgba(196,181,253,0.2)", // purple-300
                };

            return (
              <Link
                href={`/chat/${character.id}`}
                key={character.id}
                className="text-center cursor-pointer group block"
                onMouseEnter={() => setHoveredCharacter(character.id)}
                onMouseLeave={() => setHoveredCharacter(null)}
              >
                {/* Character Image */}
                <div className="relative mb-6">
                  <div className="relative">
                    <div className="relative w-48 h-48 mx-auto">
                      {/* BorderBeam for circular image with dynamic colors */}
                      <div className="absolute -inset-1 rounded-full overflow-hidden z-0">
                        <BorderBeam
                          duration={12}
                          size={250}
                          colorFrom={colorScheme.borderFrom}
                          colorTo={colorScheme.borderTo}
                          borderWidth={3}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-full h-full rounded-full overflow-hidden relative z-10">
                        <img
                          src={character.backgroundImageUrl}
                          alt={character.name}
                          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                            isHovered
                              ? "scale-105 brightness-105"
                              : "scale-100 brightness-95"
                          }`}
                        />
                      </div>
                      {/* Main glow effect with dynamic colors */}
                      <div
                        className={`absolute inset-0 w-full h-full rounded-full transition-all duration-500 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 40px 10px ${colorScheme.glowColor}`
                            : "none",
                        }}
                      />
                      {/* Soft outer glow with dynamic colors */}
                      <div
                        className={`absolute inset-0 w-full h-full rounded-full transition-all duration-700 ${
                          isHovered
                            ? `ring-1 ${colorScheme.ringColor}`
                            : "ring-0"
                        }`}
                        style={{
                          boxShadow: isHovered
                            ? `0 0 20px 5px ${colorScheme.shadowColor}`
                            : "none",
                        }}
                      />
                      {/* Subtle pulsing effect with dynamic colors */}
                      {isHovered && (
                        <div
                          className="absolute inset-0 w-full h-full rounded-full"
                          style={{
                            boxShadow: `0 0 50px 15px ${colorScheme.shadowColor}`,
                            animation:
                              "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Character Info */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-light text-white transition-opacity duration-300 hover:opacity-80">
                    {character.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 text-xs text-gray-400">
        Made by{" "}
        <a
          href="https://x.com/sahil_gulihar_"
          target="_blank"
          className="underline hover:text-gray-200"
        >
          Sahil Gulihar
        </a>{" "}
        and{" "}
        <a
          href="https://x.com/saloni_who"
          target="_blank"
          className="underline hover:text-gray-200"
        >
          Saloni
        </a>{" "}
        with{" "}
        <a
          href="https://github.com/sahil-gulihar/c.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300"
        >
          GitHub
        </a>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
}
