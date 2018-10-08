import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import HomeScreen from "../screens/HomeScreen";

it("matches snapshot", () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<HomeScreen />);
  expect(result).toMatchSnapshot();
});
