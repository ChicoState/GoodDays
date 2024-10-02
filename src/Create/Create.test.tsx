import * as React from "react";
import { shallow } from "enzyme";
import Create from "./Create";

describe("Create", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Create />);
    expect(wrapper).toMatchSnapshot();
  });
});
