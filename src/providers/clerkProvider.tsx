"use client";

import type { ReactNode } from "react";

import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";

interface ClerkCustomProviderProps {
  children: ReactNode;
}

const ClerkCustomProvider = ({ children }: ClerkCustomProviderProps) => {
  const { theme } = useTheme();
  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkCustomProvider;
