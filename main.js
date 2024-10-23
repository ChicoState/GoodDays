// electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let main_window;

function createWindow() {
    main_window = new BrowserWindow({
        width: 800,
        height: 600,
        nodeIntegration: true,
        webPreferences: {
            nodeIntegration: true,
        },
        devTools: true,
    });

    main_window.webContents.openDevTools();
    main_window.loadFile(path.join(__dirname, "main.html"));

    main_window.on('closed', () => (mainWindow = null));
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
