import { NavLink, Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";
import { useEffect } from "react";

function Layout() {
  const navigate = useNavigate();
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const base = "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150";
  const activeLink = `${base} bg-blue-600 font-semibold text-white shadow-sm shadow-blue-600/20`;
  const idleLink = `${base} text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white`;

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left Brand */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-base shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                LF
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                Campus Tracker
              </span>
            </NavLink>

            {/* Navigation links */}
            <nav className="hidden sm:flex items-center gap-1">
              <NavLink to="/" end className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/items" className={linkClass}>
                Items
              </NavLink>
              <NavLink to="/claims" className={linkClass}>
                Claims
              </NavLink>
            </nav>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* Auth status */}
            {userName === null ? (
              <button
                onClick={() => navigate("/login")}
                className="rounded-xl bg-slate-900 dark:bg-white px-4 py-2 text-xs font-bold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm transition"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="hidden md:inline-block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {userName}
                </span>
                <button
                  onClick={logout}
                  className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
