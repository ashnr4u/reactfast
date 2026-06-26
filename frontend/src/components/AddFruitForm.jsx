import React, { useState } from 'react';

const AddFruitForm = ({ addFruit }) => {
  const [fruitName, setFruitName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = fruitName.trim();
    
    if (!trimmedName) {
      alert('Please enter a fruit name');
      return;
    }

    setIsSubmitting(true);
    try {
      await addFruit(trimmedName);
      setFruitName(''); // Clear input on success
    } catch (error) {
      // Error is handled in parent component
      console.error('Submit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={fruitName}
        onChange={(e) => setFruitName(e.target.value)}
        placeholder="Enter fruit name"
        disabled={isSubmitting}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !fruitName.trim()}
        style={{ padding: '8px 16px' }}
      >
        {isSubmitting ? 'Adding...' : 'Add Fruit'}
      </button>
    </form>
  );
};

export default AddFruitForm;