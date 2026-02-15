"use client";

import Link from "next/link";
import Image from "next/image";
import getImage from "@/app/shared/api/get-image";
import React, { useActionState, useEffect, useState } from "react";
import createUser from "../api/create-user";


export default function Signup() {
  const [state, formAction] = useActionState(createUser, { error: "" });
  const [imgUrl, setImgUrl] = useState<{ url: string } | null>(null);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getImgSrc = async () => {
      const url = await getImage("login.png");
      setImgUrl(url);
    };
    getImgSrc();
  }, []);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password: string) {
    //8 chars, at least 1 digit, at least 1 special char
    return /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, ar lest 1 digit and at least 1 special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      e.preventDefault();
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="relative hidden md:block w-[60%]">
        {imgUrl && (
          <Image
            src={imgUrl.url}
            alt="login visual"
            fill
            priority
            className="object-cover"
          />
        )}
      </div>

      <div className="flex w-full md:w-[40%] items-center justify-center bg-white px-6">
        <form
          action={formAction}
          onSubmit={handleSubmit}
          className="w-full max-w-[360px]"
        >
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-black">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border-2 border-[#E0E0E0] bg-[#E0E0E0] px-4 py-3 text-black placeholder-opacity-50 focus:border-[#B29F7E] focus:ring-2 focus:ring-[#B29F7E]"
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
            {state.error && (
              <p className="mt-2 text-sm text-red-500">{state.error}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="mb-2 block text-lg font-semibold text-black">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border-2 border-[#E0E0E0] bg-[#E0E0E0] px-4 py-3 pr-12 text-black placeholder-opacity-50 focus:border-[#B29F7E] focus:ring-2 focus:ring-[#B29F7E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#B29F7E]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {passwordError && (
              <p className="mt-2 text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-[#B29F7E] py-3 font-semibold text-white transition hover:bg-[#a28b67]"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#B29F7E]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
