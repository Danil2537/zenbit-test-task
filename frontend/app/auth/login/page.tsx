"use client";

import Link from "next/link";
import Image from "next/image";
import getImage from "@/app/shared/api/get-image";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "../server/actions";

export default function Login() {
  const [state, formAction] = useActionState(loginAction, { error: "" });
  const [imgUrl, setImgUrl] = useState<{ url: string; } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const getImgSrc = async () => {
      const url = await getImage("login.png");
      setImgUrl(url);
    };
    getImgSrc();
  }, []);
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
            {state.error && (
              <p className="mt-2 text-sm text-red-500">{state.error}</p>
            )}
          </div>
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
          <div className="mb-6 text-right">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-semibold text-[#B29F7E] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#B29F7E] py-3 font-semibold text-white transition hover:bg-[#a28b67]"
          >
            Sign In
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-[#B29F7E]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
