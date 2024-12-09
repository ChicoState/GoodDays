const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let main_window;

function createWindow() {
    main_window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,  // Set to true for better security
            nodeIntegration: false,  // Disable node integration
            preload: path.join(__dirname, 'preload.js'),  // Load the preload script
        },
        devTools: true,
    });

    main_window.webContents.openDevTools();
    main_window.loadFile(path.join(__dirname, "main.html"));

    //makes the call
    main_window.webContents.mainFrame.ipc.handle("load-journal", async (event) => {
        // main_window.webContents.once('did-finish-load', () => {
        //     main_window.webContents.send('load-journal', journalEntries);
        // });
        try {
            console.log("attempting to load journal");

            return await load_journal();
        } catch (err) {
            console.log("failed to load journal", err);
        }

        return null;
    });

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
    const filePath = path.join(__dirname, 'journal.json'); // Path to save journal entries
    try {
        fs.writeFileSync(filePath, JSON.stringify(journalEntries, null, 2));
        return 'Journal entry saved successfully';
    } catch (error) {
        console.error('Failed to save journal entry:', error);
        throw error; // Propagate the error back to renderer
    }
});

function load_journal() {
    return new Promise((resolve, reject) => {
        // Load journal.json and send the data to renderer
        const journalFilePath = path.join(__dirname, 'journal.json');
        fs.readFile(journalFilePath, 'utf-8', (err, data) => {
            if (!err) {
                try {
                    const journalEntries = JSON.parse(data);
                    // Send the loaded entries to the renderer process
                    resolve(journalEntries);
                } catch (parseError) {
                    console.error('Failed to parse journal entries:', parseError);
                    reject(parseError);
                }
            } else {
                console.error('Failed to read journal.json:', err);
                reject(err);
            }
        });
    })
    
}