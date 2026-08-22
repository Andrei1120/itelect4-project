import { useState } from "react";
import type { User } from "../types/index";
import UserCard from "../components/UserCard";
import { allUsers } from "../data/mockData";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h2>
      
      {selectedUser && (
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800 transition-colors">
          <strong>Selected User:</strong> {selectedUser.name} ({selectedUser.role})
        </div>
      )}

      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">System Users</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allUsers.map((user) => (
          <UserCard 
            key={user.id} 
            user={user} 
            onSelect={setSelectedUser} 
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
