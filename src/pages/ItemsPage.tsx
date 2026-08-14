import { useState } from "react";
import { Link } from "react-router";
import ItemCard from "../components/ItemCard";
import { allItems } from "../data/mockData";

function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Lost & Found Items
      </h2>

      <input
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search items by title or location..."
        className="w-full mb-6 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Link key={item.id} to={`/items/${item.id}`} className="block transition-transform hover:scale-[1.02]">
            <ItemCard item={item} />
          </Link>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-center">No items found matching your search.</p>
      )}
    </div>
  );
}

export default ItemsPage;
