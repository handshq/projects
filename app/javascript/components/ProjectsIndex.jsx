import React, { useEffect } from "react";
import axios from "axios";

export default function ProjectsIndex() {
  // useEffect(() => {
  //   axios.get("/projects.json").then((response) => {
  //     console.log(response.data)
  //   })
  // }, [])

  const projects = [
    { name: "Dummy 0" },
    { name: "Dummy 1" },
    { name: "Dummy 2" },
    { name: "Dummy 3" },
    { name: "Dummy 4" }
  ];

  return (
    <>
      <h1>Projects</h1>
      <div id="filters">

      </div>
      <table id="projects">
        <thead>
          <tr><th>Name</th></tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            return (
              <tr key={index}><td>{project.name}</td></tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
