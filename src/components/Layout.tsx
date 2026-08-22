import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const navigate = useNavigate();
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navClass = ({ isActive }: { isActive: boolean }): string =>
    `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 shadow-sm"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
    }`;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/items");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-slate-800 dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-200 font-sans">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0f172a] p-5 flex flex-col justify-between">
        <div>
          {/* Logo & Hub Name */}
          <NavLink to="/" className="flex items-center gap-3 px-2 py-2 mb-8 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              🎒
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-tight text-slate-900 dark:text-white">
                Campus Lost &<br />Found Hub
              </h1>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <NavLink to="/" end className={navClass}>
              <span className="text-lg">⊞</span>
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/items" className={navClass}>
              <span className="text-lg">🛍️</span>
              <span>Items</span>
            </NavLink>
            <NavLink to="/claims" className={navClass}>
              <span className="text-lg">📊</span>
              <span>Reports & Claims</span>
            </NavLink>
            <button
              onClick={() => {
                setSearchTerm("");
                navigate("/items");
              }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all text-left"
            >
              <span className="text-lg">📦</span>
              <span>Categories</span>
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all text-left"
            >
              <span className="text-lg">👥</span>
              <span>Users</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all text-left"
            >
              <span className="text-lg">⚙️</span>
              <span>Settings ({isDarkMode ? "Dark" : "Light"})</span>
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Need Help Box */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-4">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
              Need Help?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Contact campus security or support for assistance.
            </p>
            <button
              onClick={() => setIsHelpOpen(true)}
              className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-xs"
            >
              Contact Support
            </button>
          </div>

          {/* Logout / Login Button */}
          {userName ? (
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
            >
              <span>⏻</span>
              <span>Logout ({userName})</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0f172a]/70 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          {/* Header Greeting */}
          <div className="hidden sm:block">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              Welcome back, {userName ? userName : "Admin"}! 👋
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Here's what's happening with lost and found items today.
            </p>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search items, reports..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/80 bg-slate-100/80 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition"
              />
              <span className="absolute left-3 top-2.5 text-xs text-slate-400">
                🔍
              </span>
            </form>

            {/* Notification Bell */}
            <button
              onClick={() => alert("No new notifications")}
              title="Notifications"
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              🔔
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark / Night Mode"}
              className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            {/* User Profile Pill */}
            <div
              onClick={() => navigate("/login")}
              className="cursor-pointer flex items-center gap-2.5 pl-2 py-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {userName ? userName.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {userName || "Admin"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Support Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Campus Security & Support
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              For immediate assistance with high-value lost items or claim verification:
            </p>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl mb-4">
              <p>📍 <strong>Office:</strong> Security Office, Main Administration Bldg</p>
              <p>📞 <strong>Hotline:</strong> (043) 123-4567 loc 101</p>
              <p>✉️ <strong>Email:</strong> lostandfound@dlsl.edu.ph</p>
            </div>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
