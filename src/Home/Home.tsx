import { useState } from "react";

import { Journal, JournalEntry, JournalEntries, gen_data } from "../journal";

type SortDir = -1 | 1;

/*
 * creates a sorting function for sorting journal entryes by date in either
 * ascending or descending order
 */
function get_sort(dir: SortDir) {
    return (a: JournalEntry, b: JournalEntry) => {
        if (a.date === b.date) {
            return 0;
        } else if (a.date < b.date) {
            return -1 * dir;
        } else {
            return 1 * dir;
        }
    };
}

const sort_desc = get_sort(-1);

interface EntriesViewProps {
    entries: JournalEntries
}

const EntriesView = ({entries}: EntriesViewProps) => {
    let tr_rows = [];

    // this is probably not optimal
    for (let entry of Object.values(entries).sort(sort_desc)) {
        tr_rows.push(<tr key={entry.date}>
            <td>{entry.date}</td>
            <td>{entry.mood}</td>
            <td>{entry.updated != null ? entry.updated : entry.created}</td>
        </tr>);
    }

    if (tr_rows.length === 0) {
        tr_rows.push(<tr key={"empty"}>
            <td colSpan={3}>No Entries</td>
        </tr>);
    }

    return <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Mood</th>
                <th>Mod</th>
            </tr>
        </thead>
        <tbody>{tr_rows}</tbody>
    </table>;
};

type HomeProps = {};

const Home = ({}: HomeProps) => {
    const [journal, setJournal] = useState<Journal>(gen_data(new Date(), 10));

    return <div>
        <EntriesView entries={journal.entries}/>
    </div>;
}

export default Home;
