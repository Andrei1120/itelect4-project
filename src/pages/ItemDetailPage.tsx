import { useParams, useNavigate } from "react-router";
import ItemCard from "../components/ItemCard";
import { allItems } from "../data/mockData";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = allItems.find((i) => i.id === Number(id));

  if (item === undefined) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-6 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
        <h2 className="text-xl font-bold mb-2">Item Not Found</h2>
        <p>No item found with ID "{id}".</p>
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
        Item Details
      </h2>
      
      <div className="max-w-md">
        <ItemCard item={item} />
      </div>

      <button 
        onClick={() => navigate("/items")}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        &larr; Back to Items
      </button>
    </div>
  );
}

export default ItemDetailPage;
