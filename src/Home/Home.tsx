import { useState } from "react";

import { Journal, JournalEntries } from "../journal";

interface EntriesViewProps {
    entries: JournalEntries
}

const EntriesView = ({entries}: EntriesViewProps) => {
    let tr_rows = [];

    for (let key in entries) {
        let modded: Date;

        if (entries[key].updated != null) {
            modded = new Date(entries[key].updated);
        } else {
            modded = new Date(entries[key].created);
        }

        tr_rows.push(<tr key={key}>
            <td>{key}</td>
            <td>{entries[key].mood}</td>
            <td>{modded}</td>
        </tr>);
    }

    if (tr_rows.length === 0) {
        tr_rows.push(<tr key={"empty"}>
            <td colSpan={3}>No Entries</td>
        </tr>);
    }

    return <div>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Mood</th>
                    <th>Mod</th>
                </tr>
            </thead>
            <tbody>{tr_rows}</tbody>
        </table>
    </div>;
};

type HomeProps = {};

const Home = ({}: HomeProps) => {
    const [journal, setJournal] = useState<Journal>({
        entries: {}
    });

    console.log(journal);

    return <div>
        <EntriesView entries={journal.entries}/>
    </div>;
}

export default Home;
