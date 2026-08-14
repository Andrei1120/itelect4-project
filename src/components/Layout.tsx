import { NavLink, Outlet } from "react-router";
import { useToggle } from "../hooks/useToggle";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";

function Layout() {
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const base = "rounded px-3 py-1.5 text-sm transition-colors";
  const activeLink = `${base} bg-blue-600 font-semibold text-white`;
  const idleLink = `${base} text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      <nav className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <span className="mr-4 font-bold text-gray-900 dark:text-white">
          Lost & Found Tracker
        </span>
        <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/items" className={linkClass}>Items</NavLink>
        <NavLink to="/claims" className={linkClass}>Claims</NavLink>

        {userName === null ? (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        ) : (
          <button 
            onClick={logout}
            className="rounded px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Logout ({userName})
          </button>
        )}

        <button 
          onClick={toggleDarkMode}
          className="ml-auto rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
