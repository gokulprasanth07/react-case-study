import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Issue } from '../types';

interface RecentlyAccessedContextType {
  recentIds: string[];
  addRecent: (id: string) => void;
}

const RecentlyAccessedContext = createContext<RecentlyAccessedContextType>({
  recentIds: [],
  addRecent: () => {},
});

const RECENT_KEY = 'recently_accessed_issues';

export const RecentlyAccessedProvider = ({ children }: { children: ReactNode }) => {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    if (stored) {
      setRecentIds(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addRecent = React.useCallback((id: string) => {
    setRecentIds(prev => {
      const filtered = prev.filter(x => x !== id);
      return [id, ...filtered].slice(0, 5);
    });
  }, []);

  return (
    <RecentlyAccessedContext.Provider value={{ recentIds, addRecent }}>
      {children}
    </RecentlyAccessedContext.Provider>
  );
};

export const useRecentlyAccessed = () => useContext(RecentlyAccessedContext);