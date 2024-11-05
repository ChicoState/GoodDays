export {};

declare global {
  interface Window {
    electron: {
      saveJournalEntry: (entry: any) => Promise<string>;
    };
  }
}
