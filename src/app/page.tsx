"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "./services/apiMethod";
import { SESSION_AUTH_TOKEN } from "./utils/constants";
import { AxiosError } from "axios";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    login(formData)
      .then((response) => {
        setMessage({
          type: "success",
          text: "Logged in successfully",
        });
        localStorage.setItem(SESSION_AUTH_TOKEN, response.token);
        setTimeout(() => {
          router.push("/crops");
        }, 1500);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        const message = (error.response?.data as { message: string })?.message;

        setMessage({
          type: "error",
          text: message || "Something went wrong",
        });
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-10">
        <div className="max-w-md">
          <Image
            src="/farming.jpg"
            alt="Farming Tractor"
            width={500}
            height={400}
            className="object-contain rounded-2xl"
            priority
          />
          <h1 className="mt-6 text-3xl font-bold text-green-800 text-center">
            Farmer Expense Tracker
          </h1>
          <p className="mt-2 text-center text-green-700">
            Manage your farm finances efficiently
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-6 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="md:hidden flex flex-col items-center mb-8">
            <Image
              src="/farming.jpg"
              alt="Farming Tractor"
              width={200}
              height={160}
              className="object-contain rounded-2xl"
              priority
            />
            <h1 className="mt-4 text-2xl font-bold text-green-800">
              Farmer Expense Tracker
            </h1>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Sign in to your account
            </h2>

            {message.text && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  message.type === "error"
                    ? "bg-red-100 text-red-700 border border-red-400"
                    : "bg-green-100 text-green-700 border border-green-400"
                }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span>{"Sign in"}</span>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {"Don't have an account?  "}
                <Link
                  href="/register"
                  className="font-medium text-green-600 hover:text-green-500">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
