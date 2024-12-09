import React, { createContext, useContext, useState } from 'react';
import { JournalEntry } from './journal';

interface JournalContextType {
  journalList: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  deleteJournalEntry: (entry: JournalEntry) => void;
}

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

// Dummy journal entries
const dummyEntries: JournalEntry[] = [
    {
      date: '2024-10-01',
      title: '1st Day',
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
      title: '2nd Day',
      hoursActive: 3,
      hoursSleeping: 7,
      hoursFocused: 4,
      hoursOnScreen: 4,
      hoursOutside: 1,
      hoursReading: 2,
      mood: 5,
      reflection: 'Just an average day.',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    {
      date: '2024-10-03',
      title: '3rd Day',
      hoursActive: 3,
      hoursSleeping: 6.5,
      hoursFocused: 2,
      hoursOnScreen: 5,
      hoursOutside: 0.5,
      hoursReading: 0,
      mood: 4,
      reflection: 'Not that good of a day.',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    {
      date: '2024-10-04',
      title: '4th Day',
      hoursActive: 1,
      hoursSleeping: 8,
      hoursFocused: 3,
      hoursOnScreen: 2,
      hoursOutside: 2,
      hoursReading: 0.5,
      mood: 9,
      reflection: 'Liesurely Day.',
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    },
    {
      date: '2024-10-05',
      title: '5th Day',
      hoursActive: 0.5,
      hoursSleeping: 8,
      hoursFocused: 7,
      hoursOnScreen: 3,
      hoursOutside: 0.5,
      hoursReading: 1,
      mood: 7,
      reflection: 'Focused Day.',
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

  const deleteJournalEntry = (entry: JournalEntry) => {

    setJournalEntries( entries => {
      // find entry with same name created on the same day
      const index = entries.findIndex(event => event.date === entry.date && event.title === entry.title);
      
      // remove match if found
      if (index !== -1) {
          return entries.filter((_, i) => i !== index);
      } else {
          console.log("Event not found");
      }

    })
  }

  return (
    <JournalContext.Provider value={{ journalList: journalEntries, addJournalEntry, deleteJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
