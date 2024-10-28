// electron.js
// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let main_window;

function createWindow() {
    main_window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,  // Enabling context isolation
            preload: path.join(__dirname, 'preload.js'),  // Load the preload script
        },
        devTools: true,
    });

    main_window.webContents.openDevTools();
    main_window.loadFile(path.join(__dirname, "main.html"));

    main_window.on('closed', () => (main_window = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (main_window === null) {
        createWindow();
    }
});

// Listen for 'save-journal-entry' event from renderer process
ipcMain.handle('save-journal-entry', async (event, journalEntries) => {
    const filePath = path.join(__dirname, 'journal.json'); // Save as .json file
    try {
        fs.writeFileSync(filePath, JSON.stringify(journalEntries, null, 2));
        return 'Journal entry saved successfully';
    } catch (error) {
        console.error('Failed to save journal entry:', error);
        throw error; // Propagate the error back to renderer
    }
});
