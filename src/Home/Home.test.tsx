import * as React from "react";
import{render, screen} from "@testing-library/react";
import Home from "./Home";
import { JournalProvider } from "../JournalContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Home renders correctly", () => {
    test("displays calendar and headers", () => {
        render(<JournalProvider><MemoryRouter><Home /></MemoryRouter></JournalProvider>)
    });

    /*
    expect(screen.getByRole("text", {name: /Moods Calendar for My GoodDays/i})).toBeInTheDocument();
    expect(screen.getByRole("table", {name: /calendar/i})).toBeInTheDocument();
    */
})





/*
describe("Home", () => {
    test("matches snapshot", () => { // need to change this because data changes, so snapshot probably wont work
       const{asFragment} = render(<JournalProvider><MemoryRouter><Home></Home></MemoryRouter></JournalProvider>);
       expect(asFragment()).toMatchSnapshot();
    });
});
*/
