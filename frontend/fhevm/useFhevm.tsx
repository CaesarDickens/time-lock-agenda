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
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const initFhevm = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamic import to avoid SSR issues
        const { FhevmLib } = await import("@zama-fhevm/relayer-client");
        const fhevmInstance = new FhevmLib();

        // Initialize the instance with timeout
        const initPromise = fhevmInstance.init();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("FHEVM initialization timeout")), 10000)
        );

        await Promise.race([initPromise, timeoutPromise]);

        setInstance(fhevmInstance as FhevmInstance);
        setRetryCount(0); // Reset retry count on success
      } catch (err: any) {
        console.error(`Failed to initialize FHEVM (attempt ${retryCount + 1}):`, err);

        const errorMessage = err.message || "Failed to initialize FHEVM";
        setError(errorMessage);

        // Retry logic for network issues
        if (retryCount < 3 && !errorMessage.includes("timeout")) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000 * (retryCount + 1)); // Exponential backoff
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    initFhevm();
  }, [retryCount]);

  return (
    <FhevmContext.Provider value={{ instance, isLoading, error }}>
      {children}
    </FhevmContext.Provider>
  );
};
