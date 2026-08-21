import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { ApiLostFoundItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { fetchItemById } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery<ApiLostFoundItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-700 dark:text-gray-300">Loading item details...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-6 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold mb-2">Error Loading Item</h2>
        <p>{error.message}</p>
        <button 
          onClick={() => navigate("/items")}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Back to Items
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>
      
      <div className="max-w-md">
        <ItemCard item={data} />
      </div>

      <div className="mt-6 flex gap-3">
        <button 
          onClick={() => navigate("/items")}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          &larr; Back to Items
        </button>
      </div>
    </div>
  );
}

export default ItemDetailPage;
