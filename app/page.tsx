"use client"

import { Plus, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function Home() {
  const router = useRouter()
  const folderContentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 relative overflow-y-auto">
      {/* Hero Section */}
      <div className="relative w-full min-h-[95vh] rounded-xl overflow-hidden">
        {/* Black Background */}
        <div className="absolute inset-0 bg-black"></div>

        <div className="absolute inset-0 flex items-start justify-center p-2 sm:p-4 pt-4 sm:pt-8">
          <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
            {/* Folder Tab - Fixed corner alignment */}
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] h-12 sm:h-14 md:h-16 lg:h-20 bg-gray-200 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-3 sm:px-4 md:px-6 relative z-10">
              <span className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight truncate">
                Anime Characters
              </span>
            </div>

            {/* Floating Start Button - Outside folder tab */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
              <button
                onClick={() => router.push("/anime")}
                className="bg-black text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg font-medium whitespace-nowrap"
              >
                Start
              </button>
            </div>

            {/* Folder Body - Fixed to connect seamlessly */}
            <div
              ref={folderContentRef}
              className="flex-1 w-full h-full bg-gray-100 rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto lg:overflow-hidden"
              style={{
                borderTopLeftRadius: "0px",
                marginTop: "-1px",
                scrollBehavior: "smooth"
              }}
            >
              <div className="p-3 sm:p-6 md:p-8 min-h-full relative">
                {/* Main Content Container */}
                <div className="min-h-[500px] sm:min-h-[600px] relative">
                  {/* Main Heading - Responsive text sizing */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
                      CREATION OF ANIME
                      <br />
                      CHARACTERS
                    </h1>
                  </div>

                  {/* Responsive layout - Stacked on mobile/tablet, grid on xl screens */}
                  <div className="flex flex-col space-y-6 xl:space-y-0 xl:grid xl:grid-cols-12 xl:gap-6 h-full">
                    {/* Left Content - Video Section */}
                    <div className="xl:col-span-5 group flex flex-col order-1">
                      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-80 lg:h-96">
                        <div className="w-full h-full overflow-hidden">
                          <img
                            src="/lime2left.jpg"
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                            style={{ objectPosition: 'center 30%' }}
                          />
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-3 md:mt-4 p-2 sm:p-3 md:p-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-800 leading-tight">
                          <span className="block">Discover Your Perfect</span>
                          <span className="block">Match here!</span>
                        </h3>
                      </div>
                    </div>

                    {/* Center Circle Element - Responsive positioning */}
                    <div className="flex items-center justify-center order-2 xl:order-2 xl:col-span-2 py-4 xl:py-0">
                      <div className="relative group">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:rotate-[360deg]"
                          onClick={() => router.push("/anime")}
                        >
                          <Plus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-800 transition-transform duration-700 group-hover:rotate-[-360deg]" />
                        </div>

                        {/* Animated Text Circle - Hidden on small screens */}
                        <div className="hidden sm:block absolute -inset-4 md:-inset-6 lg:-inset-8 pointer-events-none">
                          <svg
                            className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 group-hover:animate-[spin_5s_linear_infinite]"
                            viewBox="0 0 100 100"
                          >
                            <defs>
                              <path
                                id="circle"
                                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                fill="none"
                                stroke="none"
                              />
                            </defs>
                            <text className="text-[0.45rem] md:text-[0.55rem] fill-gray-600 font-medium">
                              <textPath
                                href="#circle"
                                startOffset="0%"
                                className="group-hover:animate-[spin_5s_linear_infinite]"
                                style={{
                                  animationDuration: "5s",
                                }}
                              >
                                LET'S CREATE • ANIME MAGIC • LET'S CREATE •
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="xl:col-span-5 order-3 flex flex-col">
                      <div className="relative group bg-white rounded-xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 mb-4 sm:mb-6 xl:-mt-10 2xl:-mt-20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                          src="/rightLime.jpg"
                          alt="Blue-haired anime character"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          style={{ objectPosition: 'center 20%' }}
                        />
                      </div>

                      {/* Info Card */}
                      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mt-auto">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">
                          Crafting Anime Characters
                        </h3>
                        <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
                          Explore our diverse collection of anime characters, each with unique personalities and
                          stories.
                        </p>
                        <div className="flex justify-center xl:justify-start">
                          <button
                            onClick={() => router.push("/anime")}
                            className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors"
                          >
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

      {/* Scroll Down Button but for small screen only */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
        <button
          onClick={() => {
            if (folderContentRef.current) {
              folderContentRef.current.scrollTo({
                top: folderContentRef.current.scrollHeight,
                behavior: "smooth"
              });
            }
          }}
          className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  )
}
