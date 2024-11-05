// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    saveJournalEntry: async (journalEntries) => {
        try {
            // Use ipcRenderer.invoke to handle asynchronous calls
            const response = await ipcRenderer.invoke('save-journal-entry', journalEntries);
            return response; // You can return the response if needed
        } catch (error) {
            console.error('Failed to save journal entry:', error);
            throw error; // Re-throw error to be handled in the calling function
        }
    }
});
