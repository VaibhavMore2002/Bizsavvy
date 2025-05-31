import React, { useEffect, useState } from 'react';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setIncome({...income, [key]: value});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(income);
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="source" className="block text-sm font-medium mb-2">
            Income Source
          </label>
          <input
            id="source"
            value={income.source}
            onChange={({target}) => handleChange("source", target.value)}
            placeholder="Freelance, Salary etc"
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
            value={income.amount}
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
            value={income.date}
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
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;