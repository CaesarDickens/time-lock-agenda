"use client";

import { useCallback, useState } from "react";

export interface StorageItem {
  key: string;
  value: any;
  timestamp: number;
  expiresAt?: number;
}

export const useInMemoryStorage = () => {
  const [storage, setStorage] = useState<Map<string, StorageItem>>(new Map());

  const setItem = useCallback((key: string, value: any, ttl?: number) => {
    const item: StorageItem = {
      key,
      value,
      timestamp: Date.now(),
      ...(ttl && { expiresAt: Date.now() + ttl }),
    };
    setStorage(prev => new Map(prev.set(key, item)));
  }, []);

  const getItem = useCallback((key: string) => {
    const item = storage.get(key);
    if (!item) return undefined;

    // Check if item has expired
    if (item.expiresAt && Date.now() > item.expiresAt) {
      removeItem(key);
      return undefined;
    }

    return item.value;
  }, [storage]);

  const removeItem = useCallback((key: string) => {
    setStorage(prev => {
      const newStorage = new Map(prev);
      newStorage.delete(key);
      return newStorage;
    });
  }, []);

  const clear = useCallback(() => {
    setStorage(new Map());
  }, []);

  const getAllItems = useCallback(() => {
    const now = Date.now();
    const validItems: StorageItem[] = [];

    for (const item of storage.values()) {
      if (!item.expiresAt || now <= item.expiresAt) {
        validItems.push(item);
      }
    }

    return validItems;
  }, [storage]);

  const hasItem = useCallback((key: string) => {
    const item = storage.get(key);
    return item && (!item.expiresAt || Date.now() <= item.expiresAt);
  }, [storage]);

  const getStorageSize = useCallback(() => {
    return storage.size;
  }, [storage]);

  // Auto cleanup expired items
  useEffect(() => {
    const cleanup = () => {
      setStorage(prev => {
        const newStorage = new Map();
        const now = Date.now();

        for (const [key, item] of prev) {
          if (!item.expiresAt || now <= item.expiresAt) {
            newStorage.set(key, item);
          }
        }

        return newStorage;
      });
    };

    const interval = setInterval(cleanup, 60000); // Clean up every minute
    return () => clearInterval(interval);
  }, []);

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    getAllItems,
    hasItem,
    getStorageSize,
  };
};
