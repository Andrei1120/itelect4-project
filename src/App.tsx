import React, { useState, useRef } from 'react';
import UserCard from './components/UserCard';
import ItemCard from './components/ItemCard';
import ClaimBadge from './components/ClaimBadge';
import { useMockData } from './hooks/useMockData';
import { useToggle } from './hooks/useToggle';
import type { User } from './types/index';

function App() {
  // 1. useState<T> for selected item and note
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [note, setNote] = useState<string>("");
  
  // Custom Hook 1 & 2 usage
  const { data, isLoading } = useMockData(); // includes useState & useEffect internally for list data & loading flag
  const [showUsers, toggleShowUsers] = useToggle(true); 

  // 3. useRef for DOM reference
  const inputRef = useRef<HTMLInputElement>(null);

  // 4. Typed onChange handler using React.ChangeEvent<HTMLInputElement>
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
    <div className="app" style={{ padding: '20px' }}>
      <h1>ITELECT4 - GT2 Part 2</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          ref={inputRef}
          value={note}
          onChange={handleNoteChange} 
          placeholder="Quick note (demo only)" 
        />
        <p>Current note state: {note}</p>
      </div>
      
      {selectedUser && (
        <div style={{ background: '#e0f7fa', padding: '10px', marginTop: '10px', marginBottom: '20px', border: '1px solid #b2ebf2' }}>
          <strong>Selected User State:</strong> {selectedUser.name}
        </div>
      )}

      {/* 2. Mock data rendered dynamically via state */}
      {isLoading ? (
        <p>Loading mock data...</p>
      ) : (
        <>
          <button onClick={toggleShowUsers} style={{ marginBottom: '10px' }}>
            {showUsers ? "Hide Users" : "Show Users"}
          </button>

          {showUsers && data?.users.map(user => (
            <UserCard 
              key={user.id}
              user={user} 
              onSelect={handleUserSelect} 
            />
          ))}

          <h2>Items</h2>
          {data?.items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}

          <h2>Claims</h2>
          {data?.claims.map(claim => (
            <ClaimBadge key={claim.id} claim={claim}>
              <p>Awaiting verification</p>
            </ClaimBadge>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
