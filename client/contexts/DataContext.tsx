'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockClients, mockBriefs, mockContentBank } from '@/data/mockData';
import type { Brief } from '@/components/clientsItem/types';
import type { Client } from '@/components/clients/types';

interface ContentItem {
  id: string;
  clientId: string;
  idea: string;
  type: string;
  stage: string;
  priority: string;
  createdAt: string;
  scheduledFor: string | null;
  platforms: string[];
  notes?: any[];
  postedAt?: string;
}

interface DataContextType {
  clients: Client[];
  briefs: Brief[];
  contentBank: ContentItem[];
  setBriefs: (briefs: Brief[] | ((prev: Brief[]) => Brief[])) => void;
  setContentBank: (content: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => void;
  addBriefs: (newBriefs: Brief[]) => void;
  addContent: (newContent: ContentItem[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [clients] = useState<Client[]>(mockClients);
  const [briefs, setBriefsState] = useState<Brief[]>([]);
  const [contentBank, setContentBankState] = useState<ContentItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedBriefs = localStorage.getItem('flowpost_briefs');
    const savedContent = localStorage.getItem('flowpost_content');

    if (savedBriefs) {
      try {
        setBriefsState(JSON.parse(savedBriefs));
      } catch (e) {
        setBriefsState(mockBriefs);
      }
    } else {
      setBriefsState(mockBriefs);
    }

    if (savedContent) {
      try {
        setContentBankState(JSON.parse(savedContent));
      } catch (e) {
        setContentBankState(mockContentBank);
      }
    } else {
      setContentBankState(mockContentBank);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('flowpost_briefs', JSON.stringify(briefs));
  }, [briefs]);

  useEffect(() => {
    localStorage.setItem('flowpost_content', JSON.stringify(contentBank));
  }, [contentBank]);

  const setBriefs = (value: Brief[] | ((prev: Brief[]) => Brief[])) => {
    if (typeof value === 'function') {
      setBriefsState(value);
    } else {
      setBriefsState(value);
    }
  };

  const setContentBank = (value: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => {
    if (typeof value === 'function') {
      setContentBankState(value);
    } else {
      setContentBankState(value);
    }
  };

  const addBriefs = (newBriefs: Brief[]) => {
    setBriefsState((prev) => [...prev, ...newBriefs]);
  };

  const addContent = (newContent: ContentItem[]) => {
    setContentBankState((prev) => [...prev, ...newContent]);
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        briefs,
        contentBank,
        setBriefs,
        setContentBank,
        addBriefs,
        addContent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}





