import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { fetchItems, fetchClaims, createItem } from "../api/client";
import useUiStore from "../store/uiStore";
import type { ApiLostFoundItem, NewLostFoundItem } from "../types/index";

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);

  // Modal State for Report Item
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formType, setFormType] = useState<"lost" | "found">("lost");
  const [formLocation, setFormLocation] = useState("");

  // 1. TanStack Query for Items
  const {
    data: items = [],
    isPending: isItemsLoading,
    isError: isItemsError,
  } = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // 2. TanStack Query for Claims
  const { data: claims = [] } = useQuery({
    queryKey: ["claims"],
    queryFn: fetchClaims,
  });

  // 3. TanStack Mutation for Reporting an Item
  const reportItemMutation = useMutation({
    mutationFn: (newItem: NewLostFoundItem) => createItem(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setIsReportModalOpen(false);
      setFormTitle("");
      setFormDescription("");
      setFormLocation("");
    },
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) return;

    reportItemMutation.mutate({
      title: formTitle.trim(),
      description: formDescription.trim() || "No additional description provided.",
      type: formType,
      location: formLocation.trim(),
      reportedAt: new Date().toISOString(),
      reportedBy: 1,
    });
  };

  const handleCategoryClick = (category: string) => {
    setSearchTerm(category);
    navigate("/items");
  };

  // Stats calculation from live TanStack Query cache
  const lostCount = items.filter((i) => i.type === "lost").length;
  const foundCount = items.filter((i) => i.type === "found").length;
  const claimedCount = claims.length;

  const categories = [
    { name: "Electronics", icon: "💻", query: "AirPods" },
    { name: "Bags & Luggage", icon: "🎒", query: "Backpack" },
    { name: "Accessories", icon: "🕶️", query: "Umbrella" },
    { name: "Jewelry", icon: "💍", query: "Watch" },
    { name: "Other", icon: "📦", query: "Flask" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-8 text-white shadow-xl border border-slate-700/60">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Live Campus Tracking
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Campus Lost & Found Hub
            </h1>
            <p className="mt-2 text-slate-300 text-base max-w-xl">
              Track, find, and reclaim lost student belongings with secure campus verification.
            </p>
          </div>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="self-start md:self-center inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 active:scale-95 transition-all duration-200"
          >
            <span className="text-lg leading-none">+</span>
            Report Item
          </button>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* LOST Card */}
        <div
          onClick={() => {
            setSearchTerm("lost");
            navigate("/items");
          }}
          className="cursor-pointer group relative overflow-hidden rounded-xl border border-rose-200 dark:border-rose-900/40 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Lost Items
            </span>
            <span className="h-3 w-3 rounded-full bg-rose-500"></span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {isItemsLoading ? "..." : lostCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              pending recovery
            </span>
          </div>
        </div>

        {/* FOUND Card */}
        <div
          onClick={() => {
            setSearchTerm("found");
            navigate("/items");
          }}
          className="cursor-pointer group relative overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Found Items
            </span>
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {isItemsLoading ? "..." : foundCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              awaiting owner
            </span>
          </div>
        </div>

        {/* CLAIMED Card */}
        <div
          onClick={() => navigate("/claims")}
          className="cursor-pointer group relative overflow-hidden rounded-xl border border-blue-200 dark:border-blue-900/40 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Active Claims
            </span>
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-900 dark:text-white">
              {claimedCount}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              in verification
            </span>
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.query)}
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 transition-all duration-200"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Reported Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Recently Reported
          </h2>
          <Link
            to="/items"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            View All ({items.length}) &rarr;
          </Link>
        </div>

        {isItemsLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse"
              ></div>
            ))}
          </div>
        ) : isItemsError ? (
          <div className="rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
            Could not load recent items. Ensure json-server is running on port 3001.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.slice(0, 4).map((item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        item.type === "found"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.reportedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <span className="mr-1">📍</span>
                  <span className="truncate">{item.location}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Report Item Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Report an Item
              </h2>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Item Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType("lost")}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      formType === "lost"
                        ? "bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    I Lost an Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("found")}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      formType === "found"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    I Found an Item
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Silver iPad Pro with black case"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. College Library, 2nd Floor"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide distinguishing features, colors, markings, etc."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reportItemMutation.isPending}
                  className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow hover:bg-blue-500 disabled:bg-slate-400 transition"
                >
                  {reportItemMutation.isPending ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
