import * as React from "react";
import {render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";


describe("Navbar displays proper links", () => {
    test("matches snapshot", () => {
        render(<BrowserRouter><Navbar></Navbar></BrowserRouter>);
        
        //const {asFragment} = render(<BrowserRouter><Navbar></Navbar></BrowserRouter>);
        //expect(asFragment()).toMatchSnapshot();
    });
    expect(screen.getByRole("navbar-links", {name: "Home"})).toBeInTheDocument(); //UPDATE
    //expect(screen.getByText("Create")).toBeInTheDocument();
    //expect(screen.getByText("Reports")).toBeInTheDocument();
});
