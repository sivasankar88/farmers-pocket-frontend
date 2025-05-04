"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { time } from "console";
import { SESSION_AUTH_TOKEN } from "../utils/constants";

interface JWTPayload {
  exp: number;
}
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
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
    } catch (err) {
      router.push("/");
    }
  }, []);
  if (isValid) {
    return (
      <div className="h-screen flex flex-col">
        <nav className="fixed top-0 left-0 right-0">
          <Navbar />
        </nav>
        <main className="flex-1 overflow-auto my-16">{children}</main>
      </div>
    );
  }
}
