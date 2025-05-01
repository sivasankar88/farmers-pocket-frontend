// app/not-found.jsx
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-green-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for seems to have been harvested.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
