"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const params = useSearchParams();
  const statusCode = params.get("code");

  let title = "Something went wrong";
  let description = "An unexpected error occurred. Please try again later.";
  let code = "500";

  if (statusCode === "ECONNABORTED") {
    title = "Request Timed Out";
    description = "The server is taking too long to respond. Please try again.";
    code = "408";
  } else if (statusCode === "429") {
    title = "Too Many Requests";
    description = "You’ve hit the rate limit. Please wait and try again.";
    code = "429";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">{code}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>
      </div>
    </div>
  );
}
