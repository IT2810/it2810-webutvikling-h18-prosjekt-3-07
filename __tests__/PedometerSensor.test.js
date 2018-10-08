import React from "react";
import renderer from "react-test-renderer";
import PedometerSensor from "../components/PedometerSensor";

it("renders correctly", () => {
  const tree = renderer.create(<PedometerSensor />).toJSON();
  expect(tree).toMatchSnapshot();
});
