"use client";

import { Plus, ChevronDown, Sparkles, Star, MessageSquareCode, Sword , } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import Link from "next/link";

function DotsBackground() {
  const [dots, setDots] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([]);

  useEffect(() => {
    // This code only runs on the client side
    setDots(
      Array(20)
        .fill(0)
        .map(() => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          delay: `${Math.random() * 3}s`,
          duration: `${2 + Math.random() * 2}s`,
        }))
    );
  }, []);

  return (
    <div className="fixed inset-0 opacity-10 pointer-events-none z-0">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-purple-300/20 rounded-full animate-pulse"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const contentGridRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed p-2 sm:p-4 lg:p-6 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/backdrop.jpg)",
      }}
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-indigo-500/4 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <DotsBackground />

      <div className="relative w-full rounded-xl backdrop-blur-sm border border-purple-500/10">
        <div className="relative p-2 sm:p-4 lg:p-6 pt-4 sm:pt-6 lg:pt-8">
          <div className="w-full max-w-7xl mx-auto flex flex-col">
            {/* Folder Tab */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 bg-gradient-to-r from-purple-100 via-white to-purple-50 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-4 sm:px-6 md:px-8 relative z-10 border border-purple-200/30">
                {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2 animate-pulse" /> */}
                <span className="text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-tight truncate">
                  Manhwa AI: Your basement era starts now.
                </span>
                {/* <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 ml-2 animate-pulse delay-500" /> */}
              </div>
            </div>

            {/* <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20">
              <button
                onClick={() => router.push("/anime")}
                className="bg-gradient-to-r from-purple-900 via-black to-purple-900 hover:from-purple-800 hover:via-gray-900 hover:to-purple-800 text-white border-2 border-purple-400/50 hover:border-purple-300/70 text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 font-medium min-w-[80px] sm:min-w-[90px] md:min-w-[100px] text-center backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  Start
                </span>
              </button>
            </div> */}

            <div
              className="w-full bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-100 rounded-xl sm:rounded-2xl shadow-2xl shadow-purple-900/20 border border-purple-200/20"
              style={{
                borderTopLeftRadius: "0px",
                marginTop: "-1px",
              }}
            >
              <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center lg:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-roboto font-black leading-[0.9] sm:leading-[0.95] md:leading-tight tracking-tight bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                    <span className="block ">Talk to your Waifu</span>
                    {/* <span className="block">ANIME CHARACTERS</span> */}
                  </h1>
                  <div className="mt-2 sm:mt-4 flex justify-center lg:justify-start">
                    <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                  </div>
                </div>

                <div
                  ref={contentGridRef}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10"
                >
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="relative group">
                      {/* Outer BorderBeam */}
                      {/* BorderBeam outside the card */}
                      <div className="absolute -inset-0.5 rounded-xl sm:rounded-2xl overflow-hidden">
                        <BorderBeam
                          duration={8}
                          size={250}
                          colorFrom="#8b5cf6"
                          colorTo="#ec4899"
                          borderWidth={3}
                        />
                      </div>

                      {/* Card Container */}
                      <div className="relative bg-gradient-to-br from-white via-purple-50/20 to-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-purple-900/10 h-48 sm:h-64 md:h-80 lg:h-96 border border-purple-200/30 hover:border-purple-300/50 transition-all duration-500">
                        <div className="w-full h-full overflow-hidden relative">
                          <Link href={"/chat/maki"}>
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                              src="/lime2left.jpg?height=400&width=600"
                              alt="Anime character creation preview"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              style={{ objectPosition: "center 25%" }}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 lg:mt-6 p-2 sm:p-3 lg:p-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black leading-tight">
                        <span className="block text-black lg:bg-gradient-to-r lg:from-black lg:via-purple-800 lg:to-black lg:bg-clip-text lg:text-transparent">Find your Partner</span>
                        <span className="block text-gray-800 font-extrabold lg:bg-gradient-to-r lg:from-black lg:via-indigo-900 lg:to-black lg:bg-clip-text lg:text-transparent">
                          Designed to Tolerate you!
                        </span>
                      </h3>
                    </div>

                    <div className="lg:hidden mt-4 sm:mt-6 mb-8 sm:mb-10 bg-gradient-to-br from-white/95 via-purple-50/50 to-white/90 backdrop-blur-sm border border-purple-300/30 rounded-xl shadow-lg shadow-purple-900/10 p-6 sm:p-7 pb-8 sm:pb-9">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-2 sm:mb-3">
                        For Your degenerate needs
                      </h3>
                      <p className="text-gray-700  text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                        A place to practice the human interactions you're too
                        terrified to have in reality. At least the code won't
                        judge your broken Japanese.
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={() => router.push("/anime")}
                          className="w-full sm:w-auto bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-2 items-center justify-center py-0">
                    <div
                      className="relative group w-1 h-48 cursor-pointer"
                      onClick={() => router.push("/anime")}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-400/40 via-indigo-500/40 to-purple-400/40 rounded-full blur-sm group-hover:blur-md transition-all duration-500 ease-out"></div>
                      <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gradient-to-b from-white/50 via-purple-200/80 to-white/50 rounded-full group-hover:scale-y-110 transition-transform duration-300"></div>
                      <div className="absolute -inset-x-4 inset-y-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-5 xl:col-span-5 order-3 flex flex-col">
                    <div className="relative -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-28 2xl:-mt-32">
                      {/* Right content card */}

                      <div className="relative group">
                        <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
                          <BorderBeam
                            duration={10}
                            size={250}
                            colorFrom="#8b5cf6"
                            colorTo="#ec4899"
                            borderWidth={2}
                          />
                        </div>
                        <Link href={"/chat/yuki"}>
                          <div className="relative bg-gradient-to-br from-white via-purple-50/20 to-white rounded-xl overflow-hidden shadow-lg shadow-purple-900/10 h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 mb-4 sm:mb-6 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 border border-purple-200/30 hover:border-purple-300/50">
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <img
                              src="/rightLime.jpg"
                              alt="Blue-haired anime character"
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 relative z-0"
                              style={{ objectPosition: "center 20%" }}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Info Card - Hidden on sm/md screens */}
                    <div className="hidden lg:block relative p-1 rounded-xl">
                      {/* <BorderBeam
                        duration={10}
                        size={250}
                        colorFrom="#8b5cf6"
                        colorTo="#ec4899"
                        borderWidth={2}
                        className="z-0"
                      /> */}
                      <div className="bg-gradient-to-br from-white/95 via-purple-50/50 to-white/90 backdrop-blur-sm rounded-xl shadow-lg shadow-purple-900/10 p-4 sm:p-5 lg:p-6">
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent mb-2 sm:mb-3 flex items-center gap-2">
                          {/* <Sparkles  /> */}
                          <Sword className="w-5 h-5 text-purple-600" />
                          For Your degenerate needs
                        </h3>
                        <p className="text-gray-700 font-inter text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
                          A place to practice the human interactions you're too
                          terrified to have in reality. At least the code won't
                          judge your broken Japanese.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                          <button
                            onClick={() => router.push("/anime")}
                            className="w-full sm:w-auto bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-900 hover:from-purple-700 hover:via-purple-800 hover:to-indigo-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            Get Started
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
