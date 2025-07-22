"use client";
import { CircleX, SquareMenu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import LogoutPopup from "./LogoutPopup";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [showMenu, toggleMeun] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-x">
        <div className="flex justify-between items-center h-16">
          <Link href="/crops" className="flex items-center">
            <span className="text-xl font-bold text-green-600">
              Farmer&apos;s Pocket
            </span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link
              href="/crops"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Dashboard
            </Link>
            <Link
              href="/crops/add"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              Add Crop
            </Link>
            <button
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setShowPopup(true);
              }}>
              Logout
            </button>
          </nav>
          <div className="md:hidden">
            <button
              className="btn hover:cursor-pointer"
              onClick={() => toggleMeun(!showMenu)}>
              {!showMenu ? (
                <SquareMenu size={25} className="text-green-600" />
              ) : (
                <CircleX size={25} className="text-green-600" />
              )}
            </button>
            {showMenu && (
              <div className="absolute md:hidden top-16 right-2 z-10 bg-white shadow rounded-b-xl py-2 w-30 ">
                <div className="flex flex-col">
                  <Link
                    href="/crops"
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link
                    href="/crops/add"
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                    Add Crop
                  </Link>
                  <button
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setShowPopup(true);
                    }}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <LogoutPopup
          setLogoutPopup={() => setShowPopup(false)}
          handleLogoutConfirm={handleLogout}
        />
      )}
    </header>
  );
};

export default Navbar;
