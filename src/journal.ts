/*
 * the full interface for a journal
 */
export interface Journal {
    entries: JournalEntries
}

/*
 * a map containing all the entries of a journal that is keyed with the date of
 * the entry
 */
export interface JournalEntries {
    [key: string]: JournalEntry
}

/*
 * the details of a journal entry
 */
export interface JournalEntry {
    date: string,

    title: string,
    hoursActive: number,
    hoursSleeping: number,
    hoursFocused: number,
    hoursOnScreen: number,
    hoursOutside: number,
    hoursReading: number,
    reflection: string,

    mood: number,

    created: string,
    updated: string | null,
}

// the base unit for timestamps is in milliseconds
const millisecond = 1;
const second = millisecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

/*
 * pads number to 2 characters with '0'
 */
function pad_num(value: number) {
    return value.toString(10).padStart(2, '0');
}

/*
 * generates an integer range between the start and end given
 */
function gen_int_range(end: number, start: number = 0): number {
    return Math.floor(Math.random() * (end - start) + start);
}

function get_entry_date(date: Date): string {
    return `${date.getFullYear()}-${pad_num(date.getMonth() + 1)}-${pad_num(date.getDate())}`;
}

/*
 * generates a list of journal entries with random data for specified number
 * of entries.
 */
export function gen_entries_list(start: Date, amount: number): JournalEntry[] {
    let rtn = [];

    for (let count = 0; count < amount; count += 1) {
        let ts = new Date(start.getTime() - (count * day));

        let entry = {
            date: get_entry_date(ts),
            title: "i am a title",
            hoursActive: gen_int_range(10),
            hoursSleeping: gen_int_range(10),
            hoursFocused: gen_int_range(10),
            hoursOnScreen: gen_int_range(10),
            hoursOutside: gen_int_range(10),
            hoursReading: gen_int_range(10),
            reflection: "stuff goes here",
            mood: gen_int_range(10),
            created: ts.toJSON(),
            updated: null
        };

        rtn.push(entry);
    }

    return rtn;
}

/*
 * creates a journal with generated data
 *
 * note: currently the only thing that is generated is the entry date
 * information everything else is staticly modified.
 */
export function gen_data(start: Date, amount: number): Journal {
    let entries = {};

    for (let count = 0; count < amount; count += 1) {
        let ts = new Date(start.getTime() - (count * day));
        let date = `${ts.getFullYear()}${pad_num(ts.getMonth() + 1)}${pad_num(ts.getDate())}`;

        let entry = {
            date,
            title: "i am a title",
            hoursActive: gen_int_range(10),
            hoursSleeping: gen_int_range(10),
            hoursFocused: gen_int_range(10),
            hoursOnScreen: gen_int_range(10),
            hoursOutside: gen_int_range(10),
            hoursReading: gen_int_range(10),
            reflection: "stuff goes here",
            mood: gen_int_range(10),
            created: ts.toJSON(),
            updated: null
        };

        entries[date] = entry;
    }

    return {
        entries,
    };
}
