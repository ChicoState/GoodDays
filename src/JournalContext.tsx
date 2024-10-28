import React, { createContext, useContext, useState } from 'react';
import { JournalEntry } from './journal';

interface JournalContextType {
  journalList: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
}

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

// Dummy journal entries
const dummyEntries: JournalEntry[] = [
    {
      date: '2024-10-01',
      title: 'First Day',
      hoursActive: 4,
      hoursSleeping: 8,
      hoursFocused: 5,
      hoursOnScreen: 3,
      hoursOutside: 2,
      hoursReading: 1,
      mood: 10,
      reflection: 'Had a productive day!',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    {
      date: '2024-10-02',
      title: 'Second Day',
      hoursActive: 3,
      hoursSleeping: 7,
      hoursFocused: 4,
      hoursOnScreen: 4,
      hoursOutside: 1,
      hoursReading: 2,
      mood: 1,
      reflection: 'Just an average day.',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
  ];

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(dummyEntries);

  const addJournalEntry = (entry: JournalEntry) => {

    setJournalEntries(prevEntries => {
      const existingEntryIndex = prevEntries.findIndex(e => e.date === entry.date);

      if (existingEntryIndex !== -1) {
        // Replace the existing entry with the new one
        const updatedEntries = [...prevEntries];
        updatedEntries[existingEntryIndex] = entry;
        return updatedEntries;
      } else {
        // Add the new entry to the end
        return [...prevEntries, entry];
      }
    });
  };

  return (
    <JournalContext.Provider value={{ journalList: journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
