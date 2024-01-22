import React from "react";
import renderer from "react-test-renderer";
import sinon from "sinon";

import ProjectsIndex from "../../app/javascript/components/ProjectsIndex";

let server;

describe(ProjectsIndex, () => {
  beforeEach(() => {
    server = sinon.fakeServer.create();
  })

  afterEach(() => {
    server.restore()
  })

  it("renders correctly", () => {
    const tree = renderer.create(<ProjectsIndex />);

    expect(tree).toMatchSnapshot()
  })
})
