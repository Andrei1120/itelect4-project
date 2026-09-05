import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import type { ApiLostFoundItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems } from "../api/client";
import { Input } from "@/components/ui/input";

function ItemsPage() {
  const { data, isPending, isError, error } = useQuery<ApiLostFoundItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">Loading items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
        {error.message} -- is json-server running on port 3001?
      </div>
    );
  }

  const filteredItems = (data ?? []).filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Lost & Found Items
      </h2>

      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items by title or location..."
        className="w-full mb-2 bg-white dark:bg-gray-800 border-border"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && previousSearch !== "" && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {filteredItems.map((item) => (
          <Link
            key={item.id}
            to={`/items/${item.id}`}
            className="block transition-transform hover:scale-[1.02]"
          >
            <ItemCard item={item} />
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
          No items found matching your search.
        </p>
      )}
    </div>
  );
}

export default ItemsPage;
