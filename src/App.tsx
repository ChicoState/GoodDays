import { useState, useEffect } from "react";
import  Navbar  from "./Navbar";
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Create from "./Create";
import Home from "./Home"
import Reports from "./Reports";

function Input() {
    let [test, setTest] = useState("");

    useEffect(() => {
        let timeout = setTimeout(() => {
            console.log(test);
        }, 500);

        return () => {
            clearTimeout(timeout);
        }
    }, [test]);

    return <input
        type="text"
        placeholder="here is a simple placeholder for the input value"
        value={test}
        onChange={(ev) => {
            setTest(ev.target.value);
        }}
    />
}

const App: React.FC = () => (
	<HashRouter>
        <Navbar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Create" element={<Create />} />
            <Route path="/Reports" element={<Reports />} />
		</Routes>
	</HashRouter>
);

export default App;
