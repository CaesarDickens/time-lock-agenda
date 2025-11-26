"use client";

import { useCallback, useState } from "react";

export interface StorageItem {
  key: string;
  value: any;
  timestamp: number;
}

export const useInMemoryStorage = () => {
  const [storage, setStorage] = useState<Map<string, StorageItem>>(new Map());

  const setItem = useCallback((key: string, value: any) => {
    const item: StorageItem = {
      key,
      value,
      timestamp: Date.now(),
    };
    setStorage(prev => new Map(prev.set(key, item)));
  }, []);

  const getItem = useCallback((key: string) => {
    return storage.get(key)?.value;
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
    return Array.from(storage.values());
  }, [storage]);

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    getAllItems,
  };
};
