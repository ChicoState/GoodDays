window.electron.ipcRenderer.on('load-journal', (journalEntries) => {
    const homePage = document.getElementById('home-page');
    if (!homePage) {
        // Exit if not on the home page
        return;
    }

    const journalList = document.getElementById('journal-list');
    journalList.innerHTML = ''; // Clear any existing entries

    if (journalEntries.length === 0) {
        const noEntriesMessage = document.createElement('p');
        noEntriesMessage.textContent = 'No Entries';
        journalList.appendChild(noEntriesMessage);
    } else {
        journalEntries.forEach(entry => {
            const entryRow = document.createElement('div');
            entryRow.innerHTML = `
                <div style="display: table-row;">
                    <div style="display: table-cell; padding-right: 10px;">${entry.date}</div>
                    <div style="display: table-cell; padding-right: 10px;">${entry.title}</div>
                    <div style="display: table-cell; padding-right: 10px;">Active Hours: ${entry.hoursActive}</div>
                    <div style="display: table-cell; padding-right: 10px;">Sleeping Hours: ${entry.hoursSleeping}</div>
                    <div style="display: table-cell; padding-right: 10px;">Focused Hours: ${entry.hoursFocused}</div>
                    <div style="display: table-cell; padding-right: 10px;">Screen Hours: ${entry.hoursOnScreen}</div>
                    <div style="display: table-cell; padding-right: 10px;">Outside Hours: ${entry.hoursOutside}</div>
                    <div style="display: table-cell; padding-right: 10px;">Reading Hours: ${entry.hoursReading}</div>
                    <div style="display: table-cell; padding-right: 10px;">Mood: ${entry.mood}</div>
                    <div style="display: table-cell; padding-right: 10px;">Reflection: ${entry.reflection}</div>
                    <div style="display: table-cell; padding-right: 10px;">Created: ${entry.created}</div>
                    <div style="display: table-cell; padding-right: 10px;">Updated: ${entry.updated}</div>
                </div>
            `;
            journalList.appendChild(entryRow);
        });
    }
});
