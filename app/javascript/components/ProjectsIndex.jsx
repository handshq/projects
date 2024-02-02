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
    { id: "1", name: "Dummy 1", start_date: date, end_date: date },
    { id: "2", name: "Dummy 2", start_date: date, end_date: date },
    { id: "3", name: "Dummy 3", start_date: date, end_date: date },
    { id: "4", name: "Dummy 4", start_date: date, end_date: date },
    { id: "5", name: "Dummy 5", start_date: date, end_date: date },
    { id: "6", name: "Dummy 6", start_date: date, end_date: date },
    { id: "7", name: "Dummy 7", start_date: date, end_date: date },
    { id: "8", name: "Dummy 8", start_date: date, end_date: date },
    { id: "9", name: "Dummy 9", start_date: date, end_date: date },
    { id: "10", name: "Dummy 10", start_date: date, end_date: date }
  ];

  return (
    <>
      <h1>Projects</h1>

      <div className="projects">
        <div className="projects-filters">
          <h2 className="heading">Filters</h2>
          <div className="item">Live</div>
          <div className="item">Future</div>
          <div className="item">Ended</div>
          <div className="item">No dates</div>
        </div>
        <table className="projects-list">
          <thead>
            <tr>
              <th className="heading">Name</th>
              <th className="heading">Start date</th>
              <th className="heading">End date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td className="item">{project.name}</td>
                  <td className="item">{project.start_date}</td>
                  <td className="item">{project.end_date}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
