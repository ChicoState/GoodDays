import { useState, useEffect } from "react";

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

function App() {
    return <div className="App">
        <header className="App-header">
            <img src="./public/logo.svg" className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
            <Input />
        </header>
    </div>;
}

export default App;
