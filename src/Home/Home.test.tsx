import * as React from "react";
import{render, screen} from "@testing-library/react";
import Home from "./Home";
import { JournalProvider } from "../JournalContext";
import { MemoryRouter } from "react-router-dom";
//import { ShallowRenderer } from "react-dom/test-utils";


describe("Home", () => {
    test("matches snapshot", () => { // need to change this because data changes, so snapshot probably wont work
        /*
        const wrapper = shallow(<Home />);
        expect(wrapper).toMatchSnapshot();
        */
       const{asFragment} = render(<JournalProvider><MemoryRouter><Home></Home></MemoryRouter></JournalProvider>);
       expect(asFragment()).toMatchSnapshot();
    });
});
