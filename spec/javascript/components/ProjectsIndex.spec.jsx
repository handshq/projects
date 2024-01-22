import React from "react";
import renderer from "react-test-renderer";

import ProjectsIndex from "../../../app/javascript/components/ProjectsIndex";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

const mockDate = new Date(0);

describe(ProjectsIndex, () => {
  beforeEach(() => {
    jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders correctly", () => {
    const tree = renderer.create(<ProjectsIndex />);

    expect(tree).toMatchSnapshot();
  });
});
