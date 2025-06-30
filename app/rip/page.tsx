"use client";

import { Sparkles, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-indigo-500/4 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full rounded-xl backdrop-blur-sm border border-purple-500/10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 rounded-xl"></div>

        <div className="relative p-2 sm:p-4 lg:p-6 pt-4 sm:pt-6 lg:pt-8">
          <div className="w-full max-w-7xl mx-auto flex flex-col">
            {/* Folder Tab */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl self-start">
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 bg-gradient-to-r from-purple-100 via-white to-purple-50 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-4 sm:px-6 md:px-8 relative z-30 border border-purple-200/30">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2 animate-pulse" />
                <span className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight truncate">
                  Manga Chatbot
                </span>
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 ml-2 animate-pulse delay-500" />
              </div>
            </div>

            {/* Start Button */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-40">
              <button
                onClick={() => router.push("/anime")}
                className="bg-gradient-to-r from-purple-900 via-black to-purple-900 hover:from-purple-800 hover:via-gray-900 hover:to-purple-800 text-white border-2 border-purple-400/50 hover:border-purple-300/70 text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 font-medium min-w-[80px] sm:min-w-[90px] md:min-w-[100px] text-center backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  Start
                </span>
              </button>
            </div>

            {/* Main Content Pane */}
            <div
              className="relative w-full bg-gradient-to-br from-gray-100/95 via-purple-50/80 to-gray-200/95 rounded-xl sm:rounded-2xl shadow-2xl shadow-purple-900/20 border border-purple-200/20 overflow-hidden"
              style={{
                borderTopLeftRadius: "0px",
                marginTop: "-1px",
              }}
            >
              {/* Flanking Character Images */}
              <img
                src="/lime2left.jpg"
                alt="Anime characters"
                className="absolute top-0 left-0 h-full w-auto max-w-[50%] object-cover object-left-top opacity-30 lg:opacity-60 pointer-events-none transition-all duration-700 ease-out z-10"
                style={{
                  maskImage:
                    "linear-gradient(to right, black 50%, transparent 100%)",
                }}
              />
              <img
                src="/rightLime.jpg"
                alt="Blue-haired anime character"
                className="absolute top-0 right-0 h-full w-auto max-w-[50%] object-cover object-right-top opacity-30 lg:opacity-60 pointer-events-none transition-all duration-700 ease-out z-10"
                style={{
                  maskImage:
                    "linear-gradient(to left, black 50%, transparent 100%)",
                }}
              />

              {/* Central Content */}
              <div className="relative z-20 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-h-[60vh] lg:min-h-[75vh]">
                <div className="text-center mb-8 mt-12 sm:mt-16 lg:mt-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-roboto font-black leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                    Talk to
                    <span className="block">YOUR WAIFU</span>
                  </h1>
                </div>

                {/* The Creation Portal */}
                <div className="flex-grow flex items-center justify-center my-8">
                  <button
                    onClick={() => router.push("/anime")}
                    className="group relative w-20 h-20 flex items-center justify-center"
                  >
                    <div className="absolute w-full h-[300%] bg-gradient-to-b from-purple-500/0 via-purple-500/20 to-purple-500/0 blur-lg transition-all duration-500 group-hover:h-[400%] group-hover:via-purple-500/30"></div>
                    <div className="relative w-2 h-40 sm:h-48 md:h-56 bg-purple-300/20 rounded-full border border-purple-300/30 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:h-64 group-hover:w-3 group-hover:shadow-lg group-hover:shadow-purple-400/30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-200 shadow-[0_0_20px_5px_rgba(192,132,252,0.8)] animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_30px_8px_rgba(216,180,254,0.9)]"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </button>
                </div>

                {/* Bottom CTA Card */}
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-md border border-purple-300/30 rounded-xl shadow-lg shadow-purple-900/10 p-4 sm:p-6 text-center mb-8 sm:mb-4 lg:mb-0">
                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-2">
                    For your degenerate needs
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    A place to practice the human interactions you're too
                    terrified to have in reality. At least the code won't judge
                    your broken Japanese.
                  </p>
                  <button
                    onClick={() => router.push("/anime")}
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
