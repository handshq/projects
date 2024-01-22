import React from "react";

const navLinks = [
  { name: "Dashboard", icon: "🏠" },
  { name: "Projects", icon: "📁" },
  { name: "Personnel", icon: "👥" },
  { name: "Settings", icon: "⚙️" },
];

export default function ProjectsIndex() {
  const date = new Date().toDateString();
  const activeRoute = "Projects";

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
    { id: "10", name: "Dummy 10", start_date: date, end_date: date },
  ];

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
        <nav className="flex flex-col gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = link.name === activeRoute;
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={link.name}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-lg transition
                  ${
                    isActive
                      ? "bg-white text-primary shadow font-bold"
                      : "hover:bg-blue-600"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.icon}</span>
                {link.name}
              </a>
            );
          })}
        </nav>
        {/* Placeholder for future filter checkboxes */}
        <div
          className="my-8 h-20 bg-blue-100 bg-opacity-20 rounded-lg flex items-center justify-center text-blue-200 border border-blue-200"
          aria-label="Filters placeholder"
        ></div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <header>
          <h1 className="text-3xl font-bold mb-8 text-primary">Projects</h1>
        </header>
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
                  Name
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
      </main>
    </div>
  );
}
