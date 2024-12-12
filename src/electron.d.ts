import { JournalEntry } from "./journal";

export {};

declare global {
  interface Window {
    electron: {
      saveJournalEntry: (entry: any) => Promise<string>,
      loadJournal: () => Promise<JournalEntry[]>,
    };
  }
}