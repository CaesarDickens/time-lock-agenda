"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface FhevmInstance {
  createEncryptedInput: (contractAddress: `0x${string}`, userAddress: `0x${string}`) => any;
  generateKeypair: () => { publicKey: Uint8Array; privateKey: Uint8Array };
  createEIP712?: (publicKey: Uint8Array, contractAddresses: `0x${string}`[], startTimestamp: string, durationDays: string) => any;
  userDecrypt?: (handles: any[], privateKey: Uint8Array, publicKey: Uint8Array, signature: string, contractAddresses: `0x${string}`[], userAddress: `0x${string}`, startTimestamp: string, durationDays: string) => Promise<any>;
}

const FhevmContext = createContext<{
  instance: FhevmInstance | undefined;
  isLoading: boolean;
  error: string | null;
}>({
  instance: undefined,
  isLoading: true,
  error: null,
});

export const useFhevm = () => {
  const context = useContext(FhevmContext);
  if (!context) {
    throw new Error("useFhevm must be used within a FhevmProvider");
  }
  return context;
};

export const FhevmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instance, setInstance] = useState<FhevmInstance | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFhevm = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamic import to avoid SSR issues
        const { FhevmLib } = await import("@zama-fhevm/relayer-client");
        const fhevmInstance = new FhevmLib();

        // Initialize the instance
        await fhevmInstance.init();

        setInstance(fhevmInstance as FhevmInstance);
      } catch (err: any) {
        console.error("Failed to initialize FHEVM:", err);
        setError(err.message || "Failed to initialize FHEVM");
      } finally {
        setIsLoading(false);
      }
    };

    initFhevm();
  }, []);

  return (
    <FhevmContext.Provider value={{ instance, isLoading, error }}>
      {children}
    </FhevmContext.Provider>
  );
};
