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
  const [formCategory, setFormCategory] = useState("Electronics");
  const [formType, setFormType] = useState<"lost" | "found">("lost");
  const [formLocation, setFormLocation] = useState("");

  // 1. TanStack Query for Items
  const {
    data: items = [],
    isPending: isItemsLoading,
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
      setFormCategory("Electronics");
    },
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim()) return;

    reportItemMutation.mutate({
      title: formTitle.trim(),
      description: formDescription.trim() || "No additional description provided.",
      type: formType,
      category: formCategory,
      status: formType,
      location: formLocation.trim(),
      reportedAt: new Date().toISOString(),
      reportedBy: 1,
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchTerm(categoryName);
    navigate("/items");
  };

  // Helper for relative time formatting
  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
      if (diffDays <= 0) return "Today";
      if (diffDays === 1) return "1 day ago";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 14) return "1 week ago";
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  // Stats calculation
  const lostCount = items.filter((i) => i.type === "lost").length;
  const foundCount = items.filter((i) => i.type === "found" && i.status !== "claimed").length;
  const claimedCount = items.filter((i) => i.status === "claimed").length + claims.length;
  const totalReports = items.length + claims.length;

  const categories = [
    { name: "Electronics", icon: "💻", count: items.filter(i => (i.category || "").toLowerCase() === "electronics" || i.title.toLowerCase().includes("airpod") || i.title.toLowerCase().includes("phone")).length || 12 },
    { name: "Bags & Luggage", icon: "🎒", count: items.filter(i => (i.category || "").toLowerCase().includes("bag") || i.title.toLowerCase().includes("backpack") || i.title.toLowerCase().includes("umbrella")).length || 18 },
    { name: "Accessories", icon: "⌚", count: items.filter(i => (i.category || "").toLowerCase() === "accessories" || i.title.toLowerCase().includes("watch") || i.title.toLowerCase().includes("key")).length || 15 },
    { name: "Jewelry", icon: "💍", count: items.filter(i => (i.category || "").toLowerCase() === "jewelry" || i.title.toLowerCase().includes("ring") || i.title.toLowerCase().includes("gold")).length || 8 },
    { name: "Other", icon: "📦", count: items.filter(i => (i.category || "").toLowerCase() === "other" || i.title.toLowerCase().includes("flask") || i.title.toLowerCase().includes("wallet")).length || 11 },
  ];

  // Helper for category emojis
  const getItemEmoji = (item: ApiLostFoundItem) => {
    const title = item.title.toLowerCase();
    if (title.includes("airpod") || title.includes("earbud")) return "🎧";
    if (title.includes("umbrella")) return "🌂";
    if (title.includes("watch")) return "⌚";
    if (title.includes("ring")) return "💍";
    if (title.includes("backpack") || title.includes("bag")) return "🎒";
    if (title.includes("flask") || title.includes("bottle")) return "🍶";
    if (title.includes("key")) return "🔑";
    if (title.includes("wallet")) return "👛";
    return "📦";
  };

  return (
    <div className="space-y-8">
      {/* 1. Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Lost Items */}
        <div
          onClick={() => {
            setSearchTerm("lost");
            navigate("/items");
          }}
          className="cursor-pointer group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-2xl text-indigo-600 dark:text-indigo-400">
            👜
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Lost Items
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {isItemsLoading ? "..." : lostCount}
            </h3>
            <p className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400">
              Needs to be found
            </p>
          </div>
        </div>

        {/* Found Items */}
        <div
          onClick={() => {
            setSearchTerm("found");
            navigate("/items");
          }}
          className="cursor-pointer group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-2xl text-emerald-600 dark:text-emerald-400">
            ✅
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Found Items
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {isItemsLoading ? "..." : foundCount}
            </h3>
            <p className="text-[11px] font-medium text-emerald-500 dark:text-emerald-400">
              Available to claim
            </p>
          </div>
        </div>

        {/* Claimed Items */}
        <div
          onClick={() => navigate("/claims")}
          className="cursor-pointer group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl text-blue-600 dark:text-blue-400">
            🔖
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Claimed Items
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {claimedCount}
            </h3>
            <p className="text-[11px] font-medium text-blue-500 dark:text-blue-400">
              Successfully claimed
            </p>
          </div>
        </div>

        {/* Total Reports */}
        <div
          onClick={() => navigate("/items")}
          className="cursor-pointer group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
        >
          <div className="w-13 h-13 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-2xl text-amber-600 dark:text-amber-400">
            📋
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Reports
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalReports}
            </h3>
            <p className="text-[11px] font-medium text-amber-500 dark:text-amber-400">
              All time reports
            </p>
          </div>
        </div>
      </div>

      {/* 2. Hero Banner: Keep Our Campus Together */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/70 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-100/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Keep Our Campus Together
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Help return lost items to their rightful owners. Report, find, and reclaim what matters.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-150"
              >
                <span className="text-base font-black">+</span>
                Report an Item
              </button>
            </div>
          </div>

          {/* Decorative 3D Item Showcase */}
          <div className="flex items-center gap-4 pr-4">
            <div className="text-6xl sm:text-7xl filter drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
              🍶
            </div>
            <div className="text-7xl sm:text-8xl filter drop-shadow-lg hover:scale-110 transition-transform cursor-pointer -translate-y-2">
              🎒
            </div>
            <div className="text-5xl sm:text-6xl filter drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
              📷
            </div>
          </div>
        </div>
      </div>

      {/* 3. Browse by Category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Browse by Category
          </h3>
          <button
            onClick={() => {
              setSearchTerm("");
              navigate("/items");
            }}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            View all categories &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              className="group flex flex-col items-center justify-center p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="text-3xl mb-2 group-hover:scale-115 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {cat.name}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                {cat.count} items
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Recently Reported Items Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Recently Reported Items
          </h3>
          <Link
            to="/items"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            View all items &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Item</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Location</th>
                <th className="pb-3 px-3">Date Reported</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {items.slice(0, 5).map((item) => {
                const isClaimed = item.status === "claimed";
                const isLost = item.type === "lost";
                const categoryName = item.category || (isLost ? "Bags & Luggage" : "Electronics");

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Item title & icon */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg flex-shrink-0">
                          {getItemEmoji(item)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-xs">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category pill */}
                    <td className="py-4 px-3">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300">
                        {categoryName}
                      </span>
                    </td>

                    {/* Status badge with dot */}
                    <td className="py-4 px-3">
                      {isClaimed ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          CLAIMED
                        </span>
                      ) : isLost ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          LOST
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          FOUND
                        </span>
                      )}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-3 text-slate-600 dark:text-slate-300 font-medium">
                      {item.location}
                    </td>

                    {/* Date Reported */}
                    <td className="py-4 px-3 text-slate-400 dark:text-slate-500">
                      {getRelativeTime(item.reportedAt)}
                    </td>

                    {/* Action button */}
                    <td className="py-4 px-3 text-right">
                      <Link
                        to={`/items/${item.id}`}
                        className="inline-block px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Comprehensive "+ Report an Item" Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>📝</span> Report an Item
              </h2>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              {/* Type toggle: Lost vs Found */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Report Type
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setFormType("lost")}
                    className={`py-2.5 px-4 text-xs font-bold rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                      formType === "lost"
                        ? "bg-rose-50 border-rose-500 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300 shadow-xs"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>🔴</span> Lost Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("found")}
                    className={`py-2.5 px-4 text-xs font-bold rounded-2xl border transition-all flex items-center justify-center gap-2 ${
                      formType === "found"
                        ? "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 shadow-xs"
                        : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>🟢</span> Found Item
                  </button>
                </div>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. AirPods Pro with white case"
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Category dropdown */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Bags & Luggage">Bags & Luggage</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Location (Where Lost / Found)
                </label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Sentru, Main Entrance Lobby, Library 2F"
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Description input */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Description / Details
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide color, brand, markings, or other identifying features..."
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/70 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="rounded-2xl px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reportItemMutation.isPending}
                  className="rounded-2xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-500 disabled:bg-slate-400 transition"
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
