import * as React from "react";
import { shallow } from "enzyme";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
