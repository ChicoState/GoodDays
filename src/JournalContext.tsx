import React, { createContext, useContext, useState } from 'react';
import { JournalEntry } from './journal'; // Assuming the JournalEntry type is defined in './journal'

// Interface for the context type
interface JournalContextType {
  journalList: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => Promise<void>; // Updated to return a promise
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

  // Returning the context provider with the journal list and the addJournalEntry function
  return (
    <JournalContext.Provider value={{ journalList: journalEntries, addJournalEntry }}>
      {children}
    </JournalContext.Provider>
  );
};
