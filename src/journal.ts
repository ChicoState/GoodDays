export interface Journal {
    entries: JournalEntries
}

export interface JournalEntries {
    [key: string]: JournalEntry
}

export interface JournalEntry {
    date: string,

    title: string,
    contents: string,

    mood: number,

    created: string,
    updated: string | null,
}
