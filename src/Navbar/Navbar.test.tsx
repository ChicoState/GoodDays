import * as React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";


describe("Navbar renders properly", () => {
    test("navbar main links exist", () => {
        render(
        <BrowserRouter>
            <Navbar />
            </BrowserRouter>
            );
        
        //const {asFragment} = render(<BrowserRouter><Navbar></Navbar></BrowserRouter>);
        //expect(asFragment()).toMatchSnapshot();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reports" })).toBeInTheDocument();

     });
});
