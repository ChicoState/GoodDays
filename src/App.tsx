import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";  
import Create from "./Create";  
import Home from "./Home";  
import Reports from "./Reports";  
import { JournalProvider, useJournal } from "./JournalContext";
import { useEffect } from "react";

const App: React.FC = () => {
    const { loadJournal } = useJournal();

    useEffect(() => {
        window.electron.loadJournal().then((entries) => {
            loadJournal(entries);
        }).catch(error => {
            console.error('Failed to load journal entries:', error);
        });
    }, [loadJournal]);

    return (
        <JournalProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Create" element={<Create />} />
                <Route path="/Reports" element={<Reports />} />
            </Routes>
        </JournalProvider>
    );
};

export default App;
