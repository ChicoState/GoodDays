import * as React from "react";
import{render, screen} from "@testing-library/react";
import Home from "./Home";
import { JournalProvider } from "../JournalContext";
import { HashRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Home renders correctly", () => {

    test("displays calendar and headers", () => {
        render(<JournalProvider><HashRouter><Home /></HashRouter></JournalProvider>)

    expect(screen.getByText(/Moods Calendar for My GoodDays/i)).toBeInTheDocument();

    //get cal element:
    //const calElement = document.querySelector('.react-calendar'); //queryselecor looks for specific element in document
    const testCalendar = document.querySelector('.calendar'); //queryselecor looks for specific element in document
    //const testContainer = document.querySelector('.container');
    //const calElement = document.querySelector('.container');
    
    expect(testCalendar).toBeInTheDocument();
    });





    // test("calendar container is found", () => {

    //     const { container } = render(<JournalProvider><HashRouter><Home /></HashRouter></JournalProvider>)

    //     const testContainer = container.querySelector('.container');

    //     expect(testContainer).toBeInTheDocument();
    // });

});

/*
describe("Home", () => {
    test("matches snapshot", () => { // need to change this because data changes, so snapshot probably wont work
       const{asFragment} = render(<JournalProvider><MemoryRouter><Home></Home></MemoryRouter></JournalProvider>);
       expect(asFragment()).toMatchSnapshot();
    });
});
*/
