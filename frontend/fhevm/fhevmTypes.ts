export interface FhevmInstance {
  createEncryptedInput: (contractAddress: `0x${string}`, userAddress: `0x${string}`) => any;
  generateKeypair: () => { publicKey: Uint8Array; privateKey: Uint8Array };
  createEIP712?: (publicKey: Uint8Array, contractAddresses: `0x${string}`[], startTimestamp: string, durationDays: string) => any;
  userDecrypt?: (handles: any[], privateKey: Uint8Array, publicKey: Uint8Array, signature: string, contractAddresses: `0x${string}`[], userAddress: `0x${string}`, startTimestamp: string, durationDays: string) => Promise<any>;
}

export interface EncryptedInput {
  add8: (value: number) => void;
  add16: (value: number) => void;
  add32: (value: number) => void;
  add64: (value: bigint) => void;
  addBytes: (value: Uint8Array) => void;
  addAddress: (value: `0x${string}`) => void;
  encrypt: () => Promise<{ handles: string[], inputProof: string }>;
}

export interface DecryptionResult {
  [handle: string]: string | number | bigint | boolean;
}

export interface FhevmError extends Error {
  code?: number;
  data?: any;
}

export type FhevmNetwork = 'localhost' | 'sepolia' | 'mainnet';

export interface NetworkConfig {
  chainId: number;
  name: FhevmNetwork;
  rpcUrl: string;
  contractAddress?: `0x${string}`;
}
