 import * as React from "react";
 import {render, screen} from "@testing-library/react";
import Create from "./Create";
import { JournalProvider } from "../JournalContext";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Render Create component", () => {
    test("matches snapshot", () => {
        
        const {asFragment} = render(<JournalProvider><HashRouter><Create /></HashRouter></JournalProvider>); //fragment is portion of what user sees
        expect(asFragment()).toMatchSnapshot();
    });

    test("Shows proper input fields", () => {
        render (<JournalProvider><HashRouter><Create /></HashRouter></JournalProvider>);
        //expect(screen.getByRole("textbox", { name: "Date:" })).toBeInTheDocument();
        //expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
    });
});
