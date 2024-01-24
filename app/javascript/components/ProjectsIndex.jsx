import React, { useEffect } from "react";
import axios from "axios";

export default function ProjectsIndex() {
  // useEffect(() => {
  //   axios.get("/projects.json").then((response) => {
  //     console.log(response.data)
  //   })
  // }, [])

  const date = new Date().toDateString();

  const projects = [
    { id: "1", name: "Dummy 0", start_date: date, end_date: date },
    { id: "2", name: "Dummy 1", start_date: date, end_date: date },
    { id: "3", name: "Dummy 2", start_date: date, end_date: date },
    { id: "4", name: "Dummy 3", start_date: date, end_date: date },
    { id: "5", name: "Dummy 4", start_date: date, end_date: date }
  ];

  return (
    <>
      <h1>Projects</h1>

      <div className="projects">
        <table className="projects-filters">
          <thead>
            <tr>
              <th>Filters</th>
            </tr>
          </thead>
          <tbody>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
            <tr><td></td></tr>
          </tbody>
        </table>
        <table className="projects-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.start_date}</td>
                  <td>{project.end_date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
