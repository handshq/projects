import React from "react";
import { createRoot } from "react-dom/client";

import ProjectsIndex from "./ProjectsIndex";

export default function App() {
  return <ProjectsIndex />
}

const root = createRoot(document.getElementById("root"));
root.render(<App />)
