import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { JournalEntry } from "../journal";
import { useJournal } from "../JournalContext";
import { useLocation } from 'react-router-dom';

function JournalEntryForm(){
    
    const { addJournalEntry } = useJournal();

    // for navigation back to home page after submitting
    const navigate = useNavigate();

    // for passing entry on edit
    const location = useLocation();
    const entry = location.state?.entry;
    
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(
        entry || {
            date: "",
            title: "",
            hoursActive: 0,
            hoursSleeping: 0,
            hoursFocused: 0,
            hoursOnScreen: 0,
            hoursOutside: 0,
            hoursReading: 0,
            mood: 5,
            created: new Date().toISOString(),
            reflection: "",
            updated: null
        }
    );
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
    
        // update journal on change
        setJournalEntry({
          ...journalEntry,
            [name]: (name.startsWith("hours") || name === "mood") // for hours counts and mood, get value and handle empty string
                ? (value === "" ? "" : Number(value))
                : value,
        });
    }
    
    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        journalEntry.created=journalEntry.created || new Date().toISOString();
        journalEntry.updated=new Date().toISOString();
        event.preventDefault();
        addJournalEntry(journalEntry);
        navigate("/");
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={journalEntry.date}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={journalEntry.title}
          onChange={handleInputChange}
          placeholder="Journal Title"
        />
      </div>

      <div>
        <label>Hours Active:</label>
        <input
          type="number"
          name="hoursActive"
          value={journalEntry.hoursActive}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours Sleeping:</label>
        <input
          type="number"
          name="hoursSleeping"
          value={journalEntry.hoursSleeping}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours Focused:</label>
        <input
          type="number"
          name="hoursFocused"
          value={journalEntry.hoursFocused}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours on Screen:</label>
        <input
          type="number"
          name="hoursOnScreen"
          value={journalEntry.hoursOnScreen}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours Outside:</label>
        <input
          type="number"
          name="hoursOutside"
          value={journalEntry.hoursOutside}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours Reading:</label>
        <input
          type="number"
          name="hoursReading"
          value={journalEntry.hoursReading}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Mood (1-10):</label>
        <input
          type="number"
          name="mood"
          min="1"
          max="10"
          value={journalEntry.mood}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Contents:</label>
        <textarea
          name="reflection"
          value={journalEntry.reflection}
          onChange={handleInputChange}
          placeholder="What happened today?"
        />
      </div>

      <button type="submit">Submit Journal Entry</button>
    </form>
  );
}

type CreateProps = {
  //
};

const Create = (props: CreateProps) => {
  return (
    <div>
      <JournalEntryForm />
    </div>
  );
};

export default Create;
