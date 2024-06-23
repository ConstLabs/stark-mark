"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { AuthModeType } from "@dynamic-labs/sdk-react-core/src/lib/shared/types/connectionAndSignature";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

const DynamicProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <DynamicContextProvider
      theme={theme as any}
      settings={{
        // Find your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "fdeab507-4d0b-42da-a5fb-71a41a6e91ee",
        walletConnectors: [StarknetWalletConnectors],
        initialAuthenticationMode: "connect-only"
      }}
    >
      {children}
      <Toaster containerClassName={"toast"} />
    </DynamicContextProvider>
  )
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <DynamicProvider>
          {children}
        </DynamicProvider>
        {/*<StarknetProvider>*/}
        {/*</StarknetProvider>*/}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
