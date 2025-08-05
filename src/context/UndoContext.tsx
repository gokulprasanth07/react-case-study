import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Issue } from '../types';

interface UndoContextType {
  undoData: UndoData | null;
  triggerUndo: (prevIssues: Issue[], message: string) => void;
  performUndo: () => void;
  clearUndo: () => void;
}

interface UndoData {
  prevIssues: Issue[];
  message: string;
  timeoutId: number | null;
}

export const UndoContext = createContext<UndoContextType>({
  undoData: null,
  triggerUndo: () => {},
  performUndo: () => {},
  clearUndo: () => {},
});

export const UndoProvider = ({ children }: { children: ReactNode }) => {
  const [undoData, setUndoData] = useState<UndoData | null>(null);

  const triggerUndo = useCallback((prevIssues: Issue[], message: string) => {
    if (undoData && undoData.timeoutId) {
      clearTimeout(undoData.timeoutId);
    }
    const timeoutId = window.setTimeout(() => {
      setUndoData(null);
    }, 5000);
    setUndoData({ prevIssues, message, timeoutId });
  }, [undoData]);

  const performUndo = useCallback(() => {
    if (undoData && undoData.timeoutId) {
      clearTimeout(undoData.timeoutId);
    }
    setUndoData(null);
  }, [undoData]);

  const clearUndo = useCallback(() => {
    if (undoData && undoData.timeoutId) {
      clearTimeout(undoData.timeoutId);
    }
    setUndoData(null);
  }, [undoData]);

  return (
    <UndoContext.Provider value={{ undoData, triggerUndo, performUndo, clearUndo }}>
      {children}
    </UndoContext.Provider>
  );
};
