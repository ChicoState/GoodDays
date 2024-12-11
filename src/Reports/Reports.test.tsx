import React from "react";
import { render, screen } from "@testing-library/react";
import { useJournal } from "../JournalContext";
import Reports from "./Reports";
import"@testing-library/jest-dom";

jest.mock("../JournalContext");

describe("Reports Component", () => { //groups tests of reports
    const mockJournalList = [
        { date: "2024-10-5", hoursActive: 0, hoursSleeping: 8, hoursFocused: 3, hoursOnScreen: 2, hoursOutside: 1, hoursReading: 2, mood: 7 },
        { date: "2024-10-13", hoursActive: 6, hoursSleeping: 5, hoursFocused: 2, hoursOnScreen: 5, hoursOutside: 2, hoursReading: 1, mood: 6 },
    ];

    beforeEach(() => { // will return mock entries when useJournal called
        (useJournal as jest.Mock).mockReturnValue({ journalList: mockJournalList });
    });

    it ("Displays reports section", () => {
        render(<Reports />);
        expect(screen.getByText("Reports Section")).toBeInTheDocument();
    });

    it("corretly displays all categories of data", () => {
        render(<Reports />);
        expect(screen.getByRole("heading", { name: /Hours Active/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Hours Sleeping/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Hours Focused/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Hours on Screen/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Hours Outside/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Hours Reading/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Mood/i })).toBeInTheDocument();

        const numCategories = screen.getAllByRole("heading");
        expect(numCategories.length).toBe(8); // categories + section title
    });
});


/*
If i could do more tests I would like to test the statistical functions

describe ("check getMean", () => {
    it("correctly computes mean", () => {
        const testArr = [3, 4, 8, 1];
        expect(getMean(testArr)).toBe(4);
    });
});

    it("accurately calculates mean", () => {
        render(<Reports />);
        expect(screen.getByText("Mean")).toBeInTheDocument();
        expect(screen.getByText("5.50")).toBeInTheDocument();
    });
});
    */

