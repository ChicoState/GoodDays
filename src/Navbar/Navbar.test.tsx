import * as React from "react";
import {render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";


describe("Navbar", () => {
    test("matches snapshot", () => {
        const {asFragment} = render(<BrowserRouter><Navbar></Navbar></BrowserRouter>);
        expect(asFragment()).toMatchSnapshot();
    });
});
