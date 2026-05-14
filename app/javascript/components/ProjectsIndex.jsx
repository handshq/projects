import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import Paginate from "./Paginate";
import axios from "axios";

export default function ProjectsIndex() {
  const activeRoute = "Projects";

  const [orderBy, setOrderBy] = useState({field: "", order: ""});
  const [projects, setProjects] = useState([]);
  const [archived, setArchived] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [inputValue, setInputValue] = useState("")
  const debounceRef = useRef(null)
  const clickedPageRef = useRef(null)

  useEffect(() => {
    axios
      .get("/projects.json", {
        params: {
          archived,
          statuses: selectedStatuses,
          order_by: orderBy,
          page: currentPage,
          search: searchTerm,
        },
      })
      .then((res) => {
        const data = res.data;
        setNumberOfPages(data.number_of_pages);
        setProjects(data.projects);
      });
  }, [archived, orderBy, selectedStatuses, currentPage, searchTerm]);

  function toggleStatus(status) {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  }

  function toggleArchive() {
    setArchived((prev) => !prev)
    setSelectedStatuses(() => [])
  }

  function toggleOrderBy(field) {
    setOrderBy(prev => {
      const isSameField = prev.field === field;
      const nextOrder = isSameField && prev.order === "asc" ? "desc" : "asc";

      return { field, order: nextOrder };
    });
  }

  function search(term) {
    setInputValue(term)

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setProjects([])
      setSearchTerm(term)
      setCurrentPage(term === "" ? clickedPageRef.current : 1);
    }, 500)
  }

  // cleanup debounce on unmount
  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidepanel */}
      <aside
        className="w-64 bg-primary text-white flex flex-col py-8 px-4 shadow-lg"
        aria-label="Sidebar"
      >
        <header className="mb-10 text-2xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-3xl">🤝</span>
          <span>HandsHQ</span>
        </header>
        <Nav activeRoute={activeRoute} />
        <div className="mt-8 flex flex-col gap-6">
          <button
            onClick={toggleArchive}
            className={`w-full px-3 py-2 rounded-lg font-medium text-sm transition text-left ${
              archived
                ? "bg-white text-primary font-bold shadow"
                : "bg-blue-100 bg-opacity-20 text-blue-100 hover:bg-blue-600"
            }`}
          >
            {archived ? "Viewing archived" : "View archived"}
          </button>

          <div>
            <p className="text-xs font-semibold uppercase text-blue-200 tracking-wider mb-2">
              Status
            </p>
            {[
              { value: "live", label: "Live" },
              { value: "future", label: "Future" },
              { value: "ended", label: "Ended" },
              { value: "not_set", label: "Not set" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-2 py-1 cursor-pointer text-sm text-white"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(value)}
                  onChange={() => toggleStatus(value)}
                  className="rounded"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <header>
          <h1 className="text-3xl font-bold mb-8 text-primary">Projects</h1>
        </header>
        <div className="overflow-x-auto w-full max-w-4xl" aria-labelledby="projects-table-title">
          <input
            type="text"
            placeholder="Search by project name..."
            className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
            value={inputValue}
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <section
          className="overflow-x-auto w-full max-w-4xl shadow-xl rounded-lg bg-white border border-gray-200"
          aria-labelledby="projects-table-title"
        >
          <table
            className="min-w-full divide-y divide-gray-200"
            role="table"
            aria-label="Projects table"
          >
            <thead className="bg-primary">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  <span onClick={() => toggleOrderBy('name')}> Name &#8645; </span>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Start date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  End date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green mr-2"></span>
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {project.start_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {project.end_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-orange text-white">
                      {project.lifecycle_status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Paginate
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          setCurrentPage={setCurrentPage}
          clickedPageRef={clickedPageRef}
        />
      </main>
    </div>
  );
}
