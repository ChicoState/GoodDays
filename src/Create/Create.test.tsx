 import * as React from "react";
 import {render, screen} from "@testing-library/react";
import Create from "./Create";
import { JournalProvider } from "../JournalContext";
import { MemoryRouter } from "react-router-dom";

describe("Create", () => {
    test("matches snapshot", () => {
        // need to use react library for test no jest
        const {asFragment} = render(<JournalProvider><MemoryRouter><Create></Create></MemoryRouter></JournalProvider>); //fragment is portion of what user sees
        expect(asFragment()).toMatchSnapshot();
    })
});