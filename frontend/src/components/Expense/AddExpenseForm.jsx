import React, { useEffect, useState } from 'react';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({...expense, [key]: value});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Expense category
          </label>
          <input
            id="category"
            value={expense.category}
            onChange={({target}) => handleChange("category", target.value)}
            placeholder="Rent, Groceries etc"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Enter Amount in Rs
          </label>
          <input
            id="amount"
            value={expense.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            placeholder="₹10,000"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Date
          </label>
          <input
            id="date"
            value={expense.date}
            onChange={({target}) => handleChange("date", target.value)}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="add-btn add-btn-fill"
          >
            Add expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;