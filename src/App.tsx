import { Routes, Route, HashRouter } from "react-router-dom";

import Navbar from "./Navbar";  
import Create from "./Create";  
import Home from "./Home";  
import Reports from "./Reports";  
import { JournalProvider } from "./JournalContext";
import { useEffect } from "react";

const App: React.FC = () => {
    useEffect(() => {
        // load-journal from ipc
        // set to journal context
        window.electron.loadJournal().then((entries) => {
            entries.forEach(entry => JournalProvider(entry));
        }).catch(error => {
            console.error('Failed to load journal entries:', error);
        });


    }, []);

    return <JournalProvider>
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Create" element={<Create />} />
                <Route path="/Reports" element={<Reports />} />
            </Routes>
        </HashRouter>
    </JournalProvider>
};

export default App;