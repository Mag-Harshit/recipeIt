"use client";

import React from "react";
import { useState, useEffect } from "react";
import { eduVIC } from "@/fonts/font";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../app/firebase/config";
import Link from "next/link";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Sign out");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleProfileMenu() {
    setProfileMenu(!profileMenu);
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className={`navBar ${eduVIC}`}>RecipeIt</div>
        {user ? (
          <div className="my-auto mr-3 relative">
            <button onClick={handleProfileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="55"
                fill="currentColor"
                className="bi bi-person-circle "
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </button>
            {profileMenu && (
              <div className="absolute right-0 top-full w-full p-3 z-20 rounded-lg bg-gray-100 min-w-[150px] flex flex-col gap-2 justify-center items-start">
                <h2>Profile</h2>
                <div className="border-black border-t-2 text-left w-full ">
                  <Link href={"/createRecipe"}>
                    <button className="mt-2 text-left w-full hover:text-gray-500">
                      Create Post
                    </button>
                  </Link>
                </div>
                <div className="border-black border-t-2 text-left w-full ">
                  <button
                    className="mt-2 text-left w-full hover:text-gray-500"
                    onClick={handleSignOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className=" flex items-center gap-4">
            <Link href="/signUp">
              <button className="px-1 py-1 sm:px-3 sm:py-2 border-black w-20 sm:w-28 hover:text-white border-2 hover:bg-blue-400 transition-all rounded-xl">
                Sign Up
              </button>
            </Link>
            <Link href={"/Login"}>
              <button className="mr-3 px-1 sm:px-3 py-1 sm:py-2 text-white hover:text-black transition-all w-20 sm:w-28 hover:bg-white border-black border-2 rounded-xl bg-blue-400">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
      <hr className="h-11" />
    </div>
  );
};

export default Navbar;
