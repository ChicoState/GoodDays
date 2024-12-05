import React from "react";
import { render, screen } from "@testing-library/react";

import Reports, { LineChartComponent } from "./Reports"; // what's being rested
import { useJournal } from "../JournalContext";
// imoprting all necesary components for testing- shallow is Enzyme method for rendering components

jest.mock("../JournalContext"); //mock implementation for data to test

describe("Reports Component", () => { //groups tests of reports
    const mockJournalList = [
        { date: "2024-10-5", hoursActive: 0, hoursSleeping: 8, hoursFocused: 3, hoursOnScreen: 2, hoursOutside: 1, hoursReading: 2, mood: 7 },
        { date: "2024-10-13", hoursActive: 6, hoursSleeping: 5, hoursFocused: 2, hoursOnScreen: 5, hoursOutside: 2, hoursReading: 1, mood: 6 },
    ];

    beforeEach(() => { // will return mock entries when useJournal called
        (useJournal as jest.Mock).mockReturnValue({ journalList: mockJournalList });
    });

    it("will it render the Reports component correctly?", () => {
        const {container} = render(<Reports />);

        expect(screen.getByText("Reports Section")).toBeTruthy();
        expect(container.querySelectorAll("h4")).toHaveLength(7); //checks number of LineCharts components that are created
    });
});
