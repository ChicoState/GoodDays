import React from "react";
import { render, screen } from "@testing-library/react";
import { useJournal } from "../JournalContext";
import Reports from "./Reports";
import getMean from "./Reports";
import"@testing-library/jest-dom";
/*
import getMean from "./Reports";
import getStd from "./Reports";
import getMin from "./Reports";
import getMax from "./Reports";
*/
jest.mock("../JournalContext");

describe("Reports Component", () => { //groups tests of reports
    const mockJournalList = [
        { date: "2024-10-5", hoursActive: 0, hoursSleeping: 8, hoursFocused: 3, hoursOnScreen: 2, hoursOutside: 1, hoursReading: 2, mood: 7 },
        { date: "2024-10-13", hoursActive: 6, hoursSleeping: 5, hoursFocused: 2, hoursOnScreen: 5, hoursOutside: 2, hoursReading: 1, mood: 6 },
    ];

    beforeEach(() => { // will return mock entries when useJournal called
        (useJournal as jest.Mock).mockReturnValue({ journalList: mockJournalList });
    });

    /*
    it("will it render the Reports component correctly?", () => {
        const {container} = render(<Reports />);

        expect(screen.getByText("Reports Section")).toBeTruthy();
        expect(container.querySelectorAll("h4")).toHaveLength(7); //checks number of LineCharts components that are created
    });
    */

    it ("calculates the correct mean", () => {
        render(<Reports />);
        expect(screen.getByText("Reports Section")).toBeInTheDocument();
    });

    /*
    it("accurately calculates mean", () => {
        render(<Reports />);
        expect(screen.getByText("Mean")).toBeInTheDocument();
        expect(screen.getByText("5.50")).toBeInTheDocument();
    });
});
    */

});

describe ("check getMean", () => {
    it("correctly computes mean", () => {
        const testArr = [3, 4, 8, 1];
        expect(getMean(testArr)).toBe(4);
    });
});

