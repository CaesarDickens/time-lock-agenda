# API Reference

This document provides detailed information about the StudySchedule smart contract API and frontend hooks.

## Smart Contract API

### StudySchedule Contract

#### Constructor
```solidity
constructor()
```

#### Functions

##### createOrUpdateSchedule
```solidity
function createOrUpdateSchedule(
    uint256 date,
    externalEuint32 encryptedTargetGoals,
    externalEuint32 encryptedCompletedGoals,
    externalEuint32 encryptedPriority,
    bytes calldata inputProof
) external
```
Creates or updates a study schedule for the caller on the specified date.

**Parameters:**
- `date`: Unix timestamp of the day
- `encryptedTargetGoals`: Encrypted number of target goals
- `encryptedCompletedGoals`: Encrypted number of completed goals
- `encryptedPriority`: Encrypted priority value (1-3)
- `inputProof`: FHE input proof

##### getEncryptedTargetGoals
```solidity
function getEncryptedTargetGoals(address user, uint256 date)
    external view returns (euint32 encryptedTargetGoals)
```
Retrieves encrypted target goals for a user on a specific date.

##### getEncryptedCompletedGoals
```solidity
function getEncryptedCompletedGoals(address user, uint256 date)
    external view returns (euint32 encryptedCompletedGoals)
```
Retrieves encrypted completed goals for a user on a specific date.

##### getEncryptedCompletionRateData
```solidity
function getEncryptedCompletionRateData(address user, uint256 date)
    external view returns (euint32 completedGoals, euint32 targetGoals)
```
Retrieves encrypted data needed to calculate completion rate.

##### getEncryptedAveragePriorityData
```solidity
function getEncryptedAveragePriorityData(address user, uint256 date)
    external view returns (euint32 totalPriority, euint32 priorityCount)
```
Retrieves encrypted data needed to calculate average priority.

##### scheduleExists
```solidity
function scheduleExists(address user, uint256 date) external view returns (bool exists)
```
Checks if a schedule exists for a user on a specific date.

##### getUserDates
```solidity
function getUserDates(address user) external view returns (uint256[] memory dates)
```
Returns all dates for which a user has schedules.

##### getUserScheduleCount
```solidity
function getUserScheduleCount(address user) external view returns (uint256 count)
```
Returns the total number of schedules created by a user.

##### getUserStatistics
```solidity
function getUserStatistics(address user)
    external view returns (uint256 totalSchedules, uint256 completedPercentage)
```
Returns user statistics including total schedules and completion percentage.

## Frontend Hooks

### useStudySchedule

The main hook for interacting with the StudySchedule contract.

#### Parameters
```typescript
{
  instance: FhevmInstance | undefined;
  fhevmDecryptionSignatureStorage: GenericStringStorage;
  eip1193Provider: ethers.Eip1193Provider | undefined;
  chainId: number | undefined;
  ethersSigner: ethers.JsonRpcSigner | undefined;
  ethersReadonlyProvider: ethers.ContractRunner | undefined;
  sameChain: RefObject<(chainId: number | undefined) => boolean>;
  sameSigner: RefObject<(ethersSigner: ethers.JsonRpcSigner | undefined) => boolean>;
}
```

#### Returns
```typescript
{
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
```

### useFhevm

Hook for managing FHEVM instance initialization and state.

#### Returns
```typescript
{
  instance: FhevmInstance | undefined;
  isLoading: boolean;
  error: string | null;
}
```

## Error Handling

### Common Error Messages

- `"Contract address not configured"`: Contract not deployed or configured
- `"Wallet signer not available"`: User not connected to wallet
- `"FHEVM instance not initialized"`: FHEVM library not loaded
- `"No encrypted data available to decrypt"`: No data to decrypt
- `"Decryption failed: You don't have permission"`: Permission not granted

### Connection Status Types

- `'disconnected'`: Not connected to blockchain
- `'connecting'`: Establishing connection
- `'connected'`: Successfully connected
- `'error'`: Connection failed

## Data Types

### StudySchedule
```typescript
interface StudySchedule {
  date: number;
  targetGoals: number;
  completedGoals: number;
  priority: number;
  completionRate?: number;
  averagePriority?: number;
}
```

### EncryptedScheduleData
```typescript
interface EncryptedScheduleData {
  targetGoalsHandle?: string;
  completedGoalsHandle?: string;
  completionRateHandle?: string;
  avgPriorityHandle?: string;
}
```

### UserStatistics
```typescript
interface UserStatistics {
  totalSchedules: number;
  completedPercentage: number;
  averageCompletionRate: number;
  mostProductiveDay?: number;
}
```
