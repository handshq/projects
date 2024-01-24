import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";

import ProjectsIndex from "../../../app/javascript/components/ProjectsIndex";

let server;

const mockDate = new Date(0);

describe(ProjectsIndex, () => {
  beforeEach(() => {
    jest.spyOn(global, "Date").mockImplementation(() => mockDate)
    server = sinon.fakeServer.create();
  })

  afterEach(() => {
    jest.restoreAllMocks()
    server.restore()
  })

  it("renders correctly", () => {
    const tree = renderer.create(<ProjectsIndex />);

    expect(tree).toMatchSnapshot()
  })
})
