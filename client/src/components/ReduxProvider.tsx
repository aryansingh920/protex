"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { login } from "@/store/authSlice";
import { loadSession } from "@/store/session";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      const saved = loadSession();
      if (saved) {
        store.dispatch(login(saved));
      }
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
