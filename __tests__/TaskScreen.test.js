import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TasksScreen from "../screens/TasksScreen";

it("matches snapshot", () => {
  const renderer = new ShallowRenderer();
  const result = renderer.render(<TasksScreen />);
  expect(result).toMatchSnapshot();
});
