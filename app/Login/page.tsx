"use client";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { eduVIC, Loras } from "@/fonts/font";
import Link from "next/link";

const Login = () => {
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
  const handleCredentialsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setCredentials((prevCred) => {
      return {
        ...prevCred,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
  function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  }
  return (
    <div>
      {" "}
      <div className={`navBar ${eduVIC}`}>RecipeIt</div>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col items-center justify-center gap-10 mt-32">
          {" "}
          <div>
            <h1 className={`text-5xl ${Loras.className}`}>Log In</h1>
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
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="border-black border-[1px] p-3 rounded-3xl w-48 hover:bg-black hover:text-white transition-all"
            >
              Log In
            </button>
            <h2>
              Don&apos;t have an account?
              <Link href={"/signUp"}>
                <span className="text-blue-400 underline hover:text-blue-700 ml-1">
                  Sign Up
                </span>
              </Link>
            </h2>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
