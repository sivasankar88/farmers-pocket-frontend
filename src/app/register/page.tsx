"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { register } from "../services/apiMethod";
import { AxiosError } from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errorMessage = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!formData.name) {
      errorMessage.name = "Name is required";
      isValid = false;
    }
    if (!formData.email) {
      errorMessage.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessage.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!formData.password) {
      errorMessage.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errorMessage.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (!formData.confirmPassword) {
      errorMessage.confirmPassword = "Confirm password is required";
      isValid = false;
    }
    setErrors(errorMessage);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fill the mandatory field correctly.",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: "error",
        text: "Password and confirm password are not matching",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });
    register(formData)
      .then((response) => {
        setMessage({
          type: "success",
          text: response.message,
        });
        setTimeout(() => {
          router.push("/");
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
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50">
      <div className="hidden md:flex md:w-1/2 bg-green-50 items-center justify-center p-10">
        <div className="max-w-md">
          <Image
            src="/farmer.jpeg"
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
              src="/farmer.jpeg"
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
              Create your account
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black 
                    ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  placeholder="farmer's name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black 
      ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="farmer@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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
                  autoComplete="new-password"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black 
      ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black 
      ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="pt-2">
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
                      Registering...
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
