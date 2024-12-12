import React, { createContext, useContext, useState } from 'react';
import { JournalEntry } from './journal'; // Assuming the JournalEntry type is defined in './journal'

// Interface for the context type
interface JournalContextType {
  journalList: JournalEntry[];
  loadJournal: (entries: JournalEntry[]) => void;
  addJournalEntry: (entry: JournalEntry) => Promise<void>; // Updated to return a promise
  deleteJournalEntry: (entry: JournalEntry) => void;
}

// Creating the Journal context
export const JournalContext = createContext<JournalContextType | undefined>(undefined);

// Hook to use the Journal context
export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

// JournalProvider component to wrap the app and provide context
export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold journal entries
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]); // Initialize with empty array

  // Function to add a new journal entry
  const addJournalEntry = async (entry: JournalEntry) => {
    try {
      // Update the journal entries state
      setJournalEntries(prevEntries => {
        const updatedEntries = [...prevEntries, entry];

        // Save the updated journal entries using Electron's IPC
        window.electron.saveJournalEntry(updatedEntries)
          .then((message: string) => {
            console.log('Journal saved:', message);
          })
          .catch((error: any) => {
            console.error('Error saving journal:', error);
          });

        return updatedEntries; // Return the updated entries array
      });
    } catch (error) {
      console.error('Failed to add journal entry:', error);
    }
  };
  const deleteJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prevEntries => {
      // Find the index of the entry that matches the title and date
      const index = prevEntries.findIndex(event => event.date === entry.date && event.title === entry.title);

      if (index !== -1) {
        // Create a new array without the matching entry
        const updatedEntries = prevEntries.filter((_, i) => i !== index);

        // Save the updated journal entries using Electron's IPC
        window.electron.saveJournalEntry(updatedEntries)
          .then((message: string) => {
            console.log('Journal updated after deletion:', message);
          })
          .catch((error: any) => {
            console.error('Error saving journal after deletion:', error);
          });

        return updatedEntries; // Update the state with the filtered entries
      } else {
        console.log("Entry not found");
        return prevEntries; // Return the original state if no match
      }
    });
  };

  // Function to load journal entries
  const loadJournal = (entries: JournalEntry[]) => {
    console.log("updating journal entries to new list:", entries);

    if (entries == null) {
      console.warn("attempted to load null entries");
    } else {
      setJournalEntries(entries); // Update state with loaded entries
    }
  };

  // Returning the context provider with the journal list and functions
  return (
    <JournalContext.Provider value={{ journalList: journalEntries, addJournalEntry, loadJournal,  deleteJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
