'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/auth/hooks/useAuth';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/signup';

  if (isAuthPage) return null;

  return (
    <header className="w-full bg-[#172234] shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="text-lg font-semibold text-white">Logo</div>

        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="rounded-md border border-[#B29F7E] px-5 py-2 font-semibold text-[#B29F7E] transition hover:bg-[#B29F7E]/10"
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-md bg-[#B29F7E] px-5 py-2 font-semibold text-white transition hover:bg-[#a28b67]"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => void logout()}
              className="rounded-md bg-white px-5 py-2 font-semibold text-[#172234] transition hover:bg-gray-100"
            >
              Sign out
            </button>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center rounded-md p-2 text-white md:hidden hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#172234] px-4 pb-4 pt-3">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="w-full rounded-md border border-[#B29F7E] px-4 py-2 text-center font-semibold text-[#B29F7E]"
                onClick={() => setOpen(false)}
              >
                Log In
              </Link>

              <Link
                href="/auth/signup"
                className="w-full rounded-md bg-[#B29F7E] px-4 py-2 text-center font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logout().catch(console.error);
                setOpen(false);
              }}
              className="w-full rounded-md bg-white px-4 py-2 font-semibold text-[#172234]"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  );
}
