"use client";

import React from "react";
import { eduVIC, Loras } from "@/fonts/font";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
const signUp = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      console.log(user);

      // Set the user state to trigger the useEffect hook
      setUser(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCredentials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className={`navBar ${eduVIC}`}>RecipeIt</div>
        <div className="mr-8  ">
          <Link href={"/Login"}>
            <button className="px-3 py-2 text-white hover:text-black transition-all w-28 hover:bg-white border-black border-2 rounded-xl bg-blue-400">
              Log In
            </button>
          </Link>
        </div>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col items-center justify-center gap-10 mt-32">
          {" "}
          <div>
            <h1 className={`text-5xl ${Loras.className}`}>Sign Up</h1>
          </div>
          <div className="flex flex-col gap-3">
            <input
              className="signLoginBtn"
              placeholder="Enter your email"
              type="email"
              name="email"
              onChange={handleCredentialsChange}
              value={credentials.email}
            />
            <input
              className=" signLoginBtn"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleCredentialsChange}
              value={credentials.password}
            />
          </div>
          <div>
            <button
              type="submit"
              className="border-black border-[1px] p-3 rounded-3xl w-48 hover:bg-black hover:text-white transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signUp;
