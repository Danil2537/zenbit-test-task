"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ReactNode, useEffect } from "react";
import { setAuthenticated } from "./store/reducers/authSlice";

interface ProviderProps {
      children: ReactNode;
      authenticated: boolean;
    }

export default function Providers({ children, authenticated }: ProviderProps) {
  useEffect(() => {
    store.dispatch(setAuthenticated(authenticated));
  }, [authenticated]);

  return <Provider store={store}>{children}</Provider>;
}
