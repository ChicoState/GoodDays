import * as React from "react";
import { render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "@testing-library/jest-dom";


describe("Navbar renders properly", () => {
    test("navbar main links exist", () => {
        render(
        <HashRouter>
            <Navbar />
            </HashRouter>
            );
        
       // const {asFragment} = render(<HashRouter><Navbar></Navbar></HashRouter>);
       // expect(asFragment()).toMatchSnapshot();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Create" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reports" })).toBeInTheDocument();

     });
});
