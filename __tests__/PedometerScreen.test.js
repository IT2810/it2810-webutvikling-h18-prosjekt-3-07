import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import PedometerScreen from "../screens/PedometerScreen";

it("matches snapshot", () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<PedometerScreen />);
  expect(result).toMatchSnapshot();
});
