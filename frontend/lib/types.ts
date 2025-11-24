export interface StudySchedule {
  date: number;
  targetGoals: number;
  completedGoals: number;
  priority: number;
  completionRate?: number;
  averagePriority?: number;
}

export interface EncryptedScheduleData {
  targetGoalsHandle?: string;
  completedGoalsHandle?: string;
  completionRateHandle?: string;
  avgPriorityHandle?: string;
}

export interface DecryptedScheduleData {
  targetGoals?: number;
  completedGoals?: number;
  completionRate?: number;
  averagePriority?: number;
}

export interface ScheduleFormData {
  date: string;
  targetGoals: string;
  completedGoals: string;
  priority: string;
}

export interface UserStatistics {
  totalSchedules: number;
  completedPercentage: number;
  averageCompletionRate: number;
  mostProductiveDay?: number;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface StudyScheduleHookReturn {
  contractAddress?: string;
  isDeployed?: boolean;
  canRefresh: boolean;
  canSubmit: boolean;
  canDecrypt: boolean;
  connectionStatus: ConnectionStatus;
  createOrUpdateSchedule: (date: number, targetGoals: number, completedGoals: number, priority: number) => Promise<void>;
  decryptSchedule: (date: number) => Promise<void>;
  refreshSchedule: (date: number) => void;
  message: string;
  isRefreshing: boolean;
  isDecrypting: boolean;
  isSubmitting: boolean;
  decryptedTargetGoals?: number;
  decryptedCompletedGoals?: number;
  decryptedCompletionRate?: number;
  decryptedAvgPriority?: number;
}

export interface FHEVMInstance {
  createEncryptedInput: (contractAddress: `0x${string}`, userAddress: `0x${string}`) => any;
  generateKeypair: () => { publicKey: Uint8Array; privateKey: Uint8Array };
  createEIP712?: (publicKey: Uint8Array, contractAddresses: `0x${string}`[], startTimestamp: string, durationDays: string) => any;
  userDecrypt?: (handles: any[], privateKey: Uint8Array, publicKey: Uint8Array, signature: string, contractAddresses: `0x${string}`[], userAddress: `0x${string}`, startTimestamp: string, durationDays: string) => Promise<any>;
}
