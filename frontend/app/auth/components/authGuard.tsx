"use client";

import { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";


type AuthGuardProps = {children:ReactNode};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return children;
}
