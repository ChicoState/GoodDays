import { JournalEntry } from "../journal";
import { useJournal } from "../JournalContext"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";

// ceverett, Sprint in Progress #2: (calendar functionality)
import Calendar from 'react-calendar'; // "npm install,list react-calendar"
import 'react-calendar/dist/Calendar.css'; // (optional) default styles

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
    entries: JournalEntry[]
}

const EntriesView = () => {
    let tr_rows = [];

    const { journalList, deleteJournalEntry } = useJournal();

    const onDeleteEntry = (entry:JournalEntry) => {
        deleteJournalEntry(entry);
    }

    // this is probably not optimal
    for (let entry of journalList.sort(sort_desc)) {
        tr_rows.push(
            <tr key={entry.date}>
                <td><Link to="/Create" state={{entry}}>{entry.date}</Link></td>
                <td>{entry.title}</td>
                <td>{entry.hoursActive}</td>
                <td>{entry.hoursSleeping}</td>
                <td>{entry.hoursFocused}</td>
                <td>{entry.hoursOnScreen}</td>
                <td>{entry.hoursOutside}</td>
                <td>{entry.hoursReading}</td>
                <td>{entry.mood}</td>
                <td>{entry.reflection}</td>
                <td>{entry.created}</td>
                <td>{entry.updated}</td>
                <td> <button onClick={() => onDeleteEntry(entry)}>Delete &#x274C;</button></td>
            </tr>
        );
    }

    if (tr_rows.length === 0) {
        tr_rows.push(<tr key={"empty"}>
            <td colSpan={12}>No Entries</td>
        </tr>);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Hours Active</th>
                        <th>Hours Sleeping</th>
                        <th>Hours Focused</th>
                        <th>Hours on Screen</th>
                        <th>Hours Outside</th>
                        <th>Hours Reading</th>
                        <th>Mood</th>
                        <th>Contents</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                </thead>
                <tbody>{tr_rows}</tbody>
            </table>
        </div>
    );
};

type HomeProps = {};

const Home = ({}: HomeProps) => {


    return (
    
    <><div>
        
        <h1>Moods Calendar for My GoodDays</h1>
        <Calendar />
        
        </div><br /><div>
            
            <EntriesView/>
            
            </div></>
    );
}

export default Home;