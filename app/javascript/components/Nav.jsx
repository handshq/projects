export default function Nav({ activeRoute }) {

  const navLinks = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Projects", icon: "📁" },
    { name: "Personnel", icon: "👥" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
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
      })
      }
    </nav>
  )
}