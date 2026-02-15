"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/auth/hooks/useAuth";

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const pathname = usePathname();

    const isAuthPage =
        pathname === "/auth/login" || pathname === "/auth/signup";

    if (isAuthPage) return null;

  return (
    <header className="w-full bg-[#172234] shadow-[0_10px_40px_rgba(0,0,0,0.06),0_2px_10px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex h-20 max-w-9xl items-center justify-end px-6">
        {!isAuthPage && (
          <>
            {!isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/login"
                  className="flex h-11 min-w-[10rem] items-center justify-center rounded-md border border-[#B29F7E] bg-[#172234] px-6 font-heading text-base font-semibold text-[#B29F7E] transition hover:brightness-95"
                >
                  Log In
                </Link>

                <Link
                  href="/auth/signup"
                  className="flex h-11 min-w-[10rem] items-center justify-center rounded-md bg-[#B29F7E] px-6 font-heading text-base font-semibold text-white transition hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={logout}
                className="rounded-md bg-white px-5 py-2 font-heading font-semibold text-[#172234] transition hover:bg-gray-100"
              >
                Sign out
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
