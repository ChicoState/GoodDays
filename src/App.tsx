import { Routes, Route, HashRouter } from "react-router-dom";

import Navbar from "./Navbar";  
import Create from "./Create";  
import Home from "./Home";  
import Reports from "./Reports";  
import { JournalProvider } from "./JournalContext";

const App: React.FC = () => (
    <JournalProvider>
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Create" element={<Create />} />
                <Route path="/Reports" element={<Reports />} />
            </Routes>
        </HashRouter>
    </JournalProvider>
);

export default App;
