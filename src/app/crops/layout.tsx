"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { SESSION_AUTH_TOKEN } from "../utils/constants";
import { Bot } from "lucide-react";
import ChatBot from "../components/ChatBot";

interface JWTPayload {
  exp: number;
}
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(SESSION_AUTH_TOKEN);
    if (!token) {
      router.push("/");
    }
    try {
      const decoded = jwtDecode<JWTPayload>(token!);
      const expiryTime = decoded.exp * 1000;
      const now = Date.now();
      if (expiryTime < now) {
        localStorage.clear();
        router.push("/");
      }
      const timeout = expiryTime - now;
      const timer = setTimeout(() => {
        localStorage.clear();
        router.push("/");
      }, timeout);
      setIsValid(true);
      return () => clearTimeout(timer);
    } catch (error) {
      console.log(error);
      router.push("/");
    }
  }, [router]);
  if (isValid) {
    return (
      <div className="h-screen flex flex-col">
        <nav className="fixed top-0 left-0 right-0">
          <Navbar />
        </nav>
        <main
          className="flex-1 overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300 my-16">
          {children}
        </main>
        <div
          className="fixed bottom-5 right-5 z-50 rounded-3xl p-3 bg-green-500 cursor-pointer shadow-lg"
          onClick={() => setShowChatBot(!showChatBot)}>
          <Bot />
        </div>
        {showChatBot && <ChatBot />}
      </div>
    );
  }
}
