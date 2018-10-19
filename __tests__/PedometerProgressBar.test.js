import React from "react";
import renderer from "react-test-renderer";
import PedometerProgressBar from "../components/PedometerProgressBar";

it("renders correctly", () => {
  const tree = renderer.create(<PedometerProgressBar />).toJSON();
  expect(tree).toMatchSnapshot();
});
