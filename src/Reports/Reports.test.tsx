import * as React from "react";
import { shallow } from "enzyme";
import Reports from "./Reports";

describe("Reports", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Reports />);
    expect(wrapper).toMatchSnapshot();
  });
});
