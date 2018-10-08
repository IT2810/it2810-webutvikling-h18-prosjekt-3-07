import React from "react";
import renderer from "react-test-renderer";
import NavigationButton from "../components/NavigationButton";

it("renders correctly (navigationButton", () => {
  const tree = renderer.create(<NavigationButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
