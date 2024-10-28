const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveJournalEntry: (entry) => ipcRenderer.invoke('save-journal-entry', entry),
});
