import GeminiChatbot from "../components/GeminiChatbot";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url('/anime-girl.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Ensure it's behind other content
        }}
      />
      <GeminiChatbot />
    </div>
  );
}
