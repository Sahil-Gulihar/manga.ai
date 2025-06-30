// "use client"

// import { Plus, ChevronDown } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useRef } from "react"

// export default function Home() {
//   const router = useRouter()
//   const folderContentRef = useRef<HTMLDivElement>(null)

//   return (
//     <div className="min-h-screen bg-black p-2 sm:p-4 relative overflow-y-auto">
//       {/* Hero Section */}
//       <div className="relative w-full min-h-[95vh] rounded-xl overflow-hidden">
//         {/* Black Background */}
//         <div className="absolute inset-0 bg-black"></div>

//         <div className="absolute inset-0 flex items-start justify-center p-2 sm:p-4 pt-4 sm:pt-8">
//           <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
//             {/* Folder Tab - Fixed corner alignment */}
//             <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px] h-12 sm:h-14 md:h-16 lg:h-20 bg-gray-200 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-3 sm:px-4 md:px-6 relative z-10">
//               <span className="text-black text-sm sm:text-lg md:text-xl lg:text-2xl font-medium tracking-tight truncate">
//                 Anime Characters
//               </span>
//             </div>

//             {/* Floating Start Button - Outside folder tab */}
//             <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
//               <button
//                 onClick={() => router.push("/anime")}
//                 className="bg-black text-white text-xs sm:text-sm md:text-base px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg font-medium whitespace-nowrap"
//               >
//                 Start
//               </button>
//             </div>

//             {/* Folder Body - Fixed to connect seamlessly */}
//             <div
//               ref={folderContentRef}
//               className="flex-1 w-full h-full bg-gray-100 rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto lg:overflow-hidden"
//               style={{
//                 borderTopLeftRadius: "0px",
//                 marginTop: "-1px",
//                 scrollBehavior: "smooth"
//               }}
//             >
//               <div className="p-3 sm:p-6 md:p-8 min-h-full relative">
//                 {/* Main Content Container */}
//                 <div className="min-h-[500px] sm:min-h-[600px] relative">
//                   {/* Main Heading - Responsive text sizing */}
//                   <div className="mb-4 sm:mb-6 md:mb-8">
//                     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight">
//                       CREATION OF ANIME
//                       <br />
//                       CHARACTERS
//                     </h1>
//                   </div>

//                   {/* Responsive layout - Stacked on mobile/tablet, grid on xl screens */}
//                   <div className="flex flex-col space-y-6 xl:space-y-0 xl:grid xl:grid-cols-12 xl:gap-6 h-full">
//                     {/* Left Content - Video Section */}
//                     <div className="xl:col-span-5 group flex flex-col order-1">
//                       <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-80 lg:h-96">
//                         <div className="w-full h-full overflow-hidden">
//                           <img
//                             src="/lime2left.jpg"
//                             className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
//                             style={{ objectPosition: 'center 30%' }}
//                           />
//                         </div>
//                       </div>
//                       <div className="mt-2 sm:mt-3 md:mt-4 p-2 sm:p-3 md:p-4">
//                         <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-800 leading-tight">
//                           <span className="block">Discover Your Perfect</span>
//                           <span className="block">Match here!</span>
//                         </h3>
//                       </div>
//                     </div>

//                     {/* Center Circle Element - Responsive positioning */}
//                     <div className="flex items-center justify-center order-2 xl:order-2 xl:col-span-2 py-4 xl:py-0">
//                       <div className="relative group">
//                         <div
//                           className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:rotate-[360deg]"
//                           onClick={() => router.push("/anime")}
//                         >
//                           <Plus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-800 transition-transform duration-700 group-hover:rotate-[-360deg]" />
//                         </div>

//                         {/* Animated Text Circle - Hidden on small screens */}
//                         <div className="hidden sm:block absolute -inset-4 md:-inset-6 lg:-inset-8 pointer-events-none">
//                           <svg
//                             className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 group-hover:animate-[spin_5s_linear_infinite]"
//                             viewBox="0 0 100 100"
//                           >
//                             <defs>
//                               <path
//                                 id="circle"
//                                 d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
//                                 fill="none"
//                                 stroke="none"
//                               />
//                             </defs>
//                             <text className="text-[0.45rem] md:text-[0.55rem] fill-gray-600 font-medium">
//                               <textPath
//                                 href="#circle"
//                                 startOffset="0%"
//                                 className="group-hover:animate-[spin_5s_linear_infinite]"
//                                 style={{
//                                   animationDuration: "5s",
//                                 }}
//                               >
//                                 LET'S CREATE • ANIME MAGIC • LET'S CREATE •
//                               </textPath>
//                             </text>
//                           </svg>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right Content */}
//                     <div className="xl:col-span-5 order-3 flex flex-col">
//                       <div className="relative group bg-white rounded-xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 mb-4 sm:mb-6 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-28 2xl:-mt-32 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <img
//                           src="/rightLime.jpg"
//                           alt="Blue-haired anime character"
//                           className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 image-position-top"
//                           style={{ objectPosition: 'center 20%' }}
//                         />
//                       </div>

//                       {/* Info Card */}
//                       <div className="bg-white/80 backdrop-blur-sm border border-black rounded-xl shadow-lg p-4 sm:p-5 md:p-6 mt-auto">
//                         <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2">
//                           Crafting Anime Characters
//                         </h3>
//                         <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4">
//                           Explore our diverse collection of anime characters, each with unique personalities and
//                           stories.
//                         </p>
//                         <div className="flex justify-center xl:justify-start">
//                           <button
//                             onClick={() => router.push("/anime")}
//                             className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors"
//                           >
//                             Get Started
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Down Button but for small screen only */}
//       <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
//         <button
//           onClick={() => {
//             if (folderContentRef.current) {
//               folderContentRef.current.scrollTo({
//                 top: folderContentRef.current.scrollHeight,
//                 behavior: "smooth"
//               });
//             }
//           }}
//           className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
//           aria-label="Scroll to bottom"
//         >
//           <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
//         </button>
//       </div>
//     </div>
//   )
// }

"use client"

import { Plus, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function Home() {
  const router = useRouter()
  const folderContentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 lg:p-6">
      {/* Main Container */}
      <div className="relative w-full min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)] rounded-xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-black"></div>

        <div className="absolute inset-0 flex items-start justify-center p-2 sm:p-4 lg:p-6 pt-4 sm:pt-6 lg:pt-8">
          <div className="relative w-full h-full max-w-7xl flex flex-col">
            {/* Folder Tab */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="h-10 sm:h-12 md:h-14 lg:h-16 bg-gray-200 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-4 sm:px-6 md:px-8 relative z-10">
                <span className="text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium tracking-tight truncate">
                  Anime Characters
                </span>
              </div>
            </div>

            {/* Floating Start Button */}
            <div className="absolute top-2 right-2 sm:top-2 sm:right-2 md:top-2 md:right-2 lg:top-2 lg:right-2 xl:top-2 xl:right-2 2xl:top-2 2xl:right-2 z-20">
              <button
                onClick={() => router.push("/anime")}
                className="bg-black hover:bg-gray-800 text-white border-2 border-white text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg font-medium min-w-[80px] sm:min-w-[90px] md:min-w-[100px] text-center"
              >
                Start
              </button>
            </div>

            {/* Folder Body */}
            <div
              ref={folderContentRef}
              className="flex-1 w-full bg-gray-100 rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto lg:overflow-y-visible"
              style={{
                borderTopLeftRadius: "0px",
                marginTop: "-1px",
              }}
            >
              <div className="p-4 sm:p-6 md:p-8 lg:p-10 min-h-full">
                {/* Main Heading */}
                <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-sans font-black leading-tight tracking-tight"
                    style={{ color: "#111827" }}
                  >
                    <span className="block md:inline">CREATION OF ANIME</span>
                    <span className="hidden md:inline"> </span>
                    <br className="hidden md:block" />
                    <span className="block md:inline">CHARACTERS</span>
                  </h1>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
                  {/* Left Content - ImgSection */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-80 lg:h-96">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src="/lime2left.jpg?height=400&width=600"
                          alt="Anime character creation preview"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          style={{ objectPosition: "center 25%" }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 lg:mt-6 p-2 sm:p-3 lg:p-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-800 leading-tight">
                        <span className="block leading-tight">Discover Your Perfect</span>
                        <span className="block leading-tight">Match here!</span>
                      </h3>
                    </div>

                    {/* Info Card - Visible on sm/md screens */}
                    <div className="lg:hidden mt-4 sm:mt-6 mb-8 sm:mb-10 bg-white/90 backdrop-blur-sm border border-black rounded-xl shadow-lg p-6 sm:p-7 pb-8 sm:pb-9">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        Crafting Anime Characters
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                        Explore our diverse collection of anime characters, each with unique personalities and stories.
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={() => router.push("/anime")}
                          className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:scale-105"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle Element - Hidden on sm/md screens */}
                  <div className="hidden lg:flex lg:col-span-2 items-center justify-center py-0">
                    <div className="relative group">
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group-hover:rotate-[360deg]"
                        onClick={() => router.push("/anime")}
                      >
                        <Plus className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-800 transition-transform duration-700 group-hover:rotate-[-360deg]" />
                      </div>

                      {/* Animated Text Circle */}
                      <div className="hidden sm:block absolute -inset-6 md:-inset-8 lg:-inset-10 pointer-events-none">
                        <svg
                          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 group-hover:animate-[spin_5s_linear_infinite]"
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
                          <text className="text-[0.4rem] sm:text-[0.45rem] md:text-[0.5rem] lg:text-[0.55rem] fill-gray-600 font-medium">
                            <textPath href="#circle" startOffset="0%">
                              LET'S CREATE • ANIME MAGIC • LET'S CREATE •
                            </textPath>
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="xl:col-span-5 order-3 flex flex-col">
                    <div className="relative group bg-white rounded-xl overflow-hidden shadow-lg h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 mb-4 sm:mb-6 -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 xl:-mt-28 2xl:-mt-32 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <img
                        src="/rightLime.jpg"
                        alt="Blue-haired anime character"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 image-position-top"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>

                    {/* Info Card - Hidden on sm/md screens */}
                    <div className="hidden lg:block bg-white/90 backdrop-blur-sm border border-black rounded-xl shadow-lg p-4 sm:p-5 lg:p-6">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                        Crafting Anime Characters
                      </h3>
                      <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
                        Explore our diverse collection of anime characters, each with unique personalities and stories.
                      </p>
                      <div className="flex justify-center lg:justify-start">
                        <button
                          onClick={() => router.push("/anime")}
                          className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 hover:scale-105"
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

      {/* Scroll Down Button - Mobile/Tablet Only */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden z-20">
        <button
          onClick={() => {
            if (folderContentRef.current) {
              folderContentRef.current.scrollTo({
                top: folderContentRef.current.scrollHeight,
                behavior: "smooth",
              })
            }
          }}
          className="bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          aria-label="Scroll to bottom"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  )
}
