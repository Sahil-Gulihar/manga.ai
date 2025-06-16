# Gemini AI Chatbot

This is a [Next.js](https://nextjs.org) project that features a beautiful, modern chatbot interface powered by Google's Gemini AI.

## Features

- 🤖 Chat with Google's Gemini AI
- 🎨 Beautiful, responsive UI with dark mode support
- 💬 Real-time messaging interface
- 🔒 Secure API key handling via environment variables
- ⚡ Built with Next.js 15 and React 19

## Setup

1. **Clone the repository and install dependencies:**

```bash
bun install
```

2. **Get your Gemini API key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

3. **Set up environment variables:**
   - Copy the `.env.local` file and add your API key:
   ```bash
   cp .env.local .env.local
   ```
   - Edit `.env.local` and replace `your_api_key_here` with your actual Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start chatting with Gemini AI!

## Project Structure

- `app/page.tsx` - Main page component
- `app/components/GeminiChatbot.tsx` - Chat interface component
- `app/api/chat/route.ts` - API endpoint for Gemini AI integration
- `.env.local` - Environment variables (not committed to git)

## Usage

Simply type your message in the chat interface and press Enter or click Send. The AI will respond to your questions about coding, science, general knowledge, and more!

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Google Generative AI SDK
- Bun

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Don't forget to add your `GEMINI_API_KEY` environment variable in your Vercel project settings!
