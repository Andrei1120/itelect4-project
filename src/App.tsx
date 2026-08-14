import React, { useState, useRef, useEffect } from 'react';
import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import { useMockData } from './hooks/useMockData';
import { useToggle } from './hooks/useToggle';
import type { User } from './types/index';

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [note, setNote] = useState<string>("");
  
  const { data, isLoading } = useMockData();
  const [showUsers, toggleShowUsers] = useToggle(true); 
  const [isDarkMode, toggleDarkMode] = useToggle(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNote(e.target.value);
  };

  const handleUserSelect = (u: User): void => {
    setSelectedUser(u);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900 p-6 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">ITELECT4 - GT2 Part 3</h1>
          <button 
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md font-medium transition-colors"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <input 
            ref={inputRef}
            value={note}
            onChange={handleNoteChange} 
            placeholder="Quick note (demo only)" 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Current note state: <span className="font-medium">{note}</span></p>
        </div>
        
        {selectedUser && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6 border border-blue-200 dark:border-blue-800 transition-colors">
            <strong>Selected User State:</strong> {selectedUser.name}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <p className="ml-4 text-lg font-medium text-gray-600 dark:text-gray-400">Loading mock data...</p>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Users</h2>
                <button 
                  onClick={toggleShowUsers}
                  className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                >
                  {showUsers ? "Hide Users" : "Show Users"}
                </button>
              </div>
              
              {showUsers && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data?.users.map(user => (
                    <UserCard 
                      key={user.id}
                      user={user} 
                      onSelect={handleUserSelect} 
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Items</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.items.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Claims</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.claims.map(claim => (
                  <ClaimBadge key={claim.id} claim={claim}>
                    <p className="text-gray-600 dark:text-gray-400 italic">Awaiting verification</p>
                  </ClaimBadge>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
