import React, { useEffect, useState } from 'react';
import api from "../api.js";
import AddFruitForm from './AddFruitForm.jsx';

const FruitList = () => {
  // State management
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // Fetch fruits with loading state
  const fetchFruits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/fruits');
      setFruits(response.data.fruits);
    } catch (error) {
      setError('Failed to load fruits. Please try again.');
      console.error("Error fetching fruits", error);
    } finally {
      setLoading(false);
    }
  };

  // Add fruit with error handling
  const addFruit = async (fruitName) => {
    setError(null);
    try {
      await api.post('/fruits', { name: fruitName });
      await fetchFruits(); // Refresh list
    } catch (error) {
      setError('Failed to add fruit. Please try again.');
      console.error("Error adding fruit", error);
    }
  };

  // Delete fruit
  const deleteFruit = async (id) => {
    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this fruit?')) {
      return;
    }

    setError(null);
    try {
      await api.delete(`/fruits/${id}`);
      // Optimistic update - remove from UI immediately
      setFruits(fruits.filter(fruit => fruit.id !== id));
    } catch (error) {
      setError('Failed to delete fruit. Please try again.');
      console.error("Error deleting fruit", error);
      // Re-fetch to ensure consistency
      fetchFruits();
    }
  };

  // Start editing a fruit
  const startEditing = (fruit) => {
    setEditingId(fruit.id);
    setEditName(fruit.name);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditName('');
  };

  // Save edited fruit
  const saveEdit = async (id) => {
    if (!editName.trim()) {
      setError('Fruit name cannot be empty');
      return;
    }

    setError(null);
    try {
      await api.put(`/fruits/${id}`, { name: editName });
      // Update local state immediately (optimistic)
      setFruits(fruits.map(fruit => 
        fruit.id === id ? { ...fruit, name: editName } : fruit
      ));
      cancelEditing();
    } catch (error) {
      setError('Failed to update fruit. Please try again.');
      console.error("Error updating fruit", error);
      // Re-fetch to ensure consistency
      fetchFruits();
    }
  };

  // Handle Enter key in edit input
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    }
    if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  // Run once when component mounts
  useEffect(() => {
    fetchFruits();
  }, []);

  return (
    <div>
      <h2>Fruits List</h2>

      {/* Loading State */}
      {loading && <p>Loading fruits...</p>}

      {/* Error State */}
      {error && (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red', marginBottom: '10px' }}>
          <strong>Error:</strong> {error}
          <button 
            onClick={fetchFruits} 
            style={{ marginLeft: '10px' }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Fruit List */}
      {!loading && (
        <>
          {fruits.length === 0 ? (
            <p>No fruits yet. Add one below!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {fruits.map((fruit) => (
                <li 
                  key={fruit.id} 
                  style={{
                    padding: '10px',
                    marginBottom: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {editingId === fruit.id ? (
                    // Edit Mode
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => handleEditKeyPress(e, fruit.id)}
                        autoFocus
                        style={{ flex: 1, padding: '5px' }}
                      />
                      <button onClick={() => saveEdit(fruit.id)}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <span style={{ flex: 1 }}>{fruit.name}</span>
                      <button onClick={() => startEditing(fruit)}>Edit</button>
                      <button 
                        onClick={() => deleteFruit(fruit.id)}
                        style={{ backgroundColor: '#ff4444', color: 'white' }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* Add Fruit Form */}
      <AddFruitForm addFruit={addFruit} />
    </div>
  );
};

export default FruitList;