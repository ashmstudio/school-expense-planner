import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext(null);

export function formatMoney(amount) {
  return `₱${amount.toFixed(2)}`;
}

// Accept amounts like 0, 80, or 15.50.
export function isValidAmount(text) {
  const value = text.trim();
  return /^\d+(\.\d{1,2})?$/.test(value) && Number(value) <= 1000000;
}

export function ExpenseProvider({ children }) {
  const [budget, setBudget] = useState(200);
  const [expenses, setExpenses] = useState({
    food: 0,
    transport: 0,
    printing: 0,
  });
  const [isSaving, setIsSaving] = useState(false);

  const sum = expenses.food + expenses.transport + expenses.printing;
  const total = Math.round(sum * 100) / 100;
  const remaining = Math.round((budget - total) * 100) / 100;

  async function saveBudget(newBudget) {
    setIsSaving(true);

    // Show the loading state for one second.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setBudget(newBudget);
    setIsSaving(false);
  }

  return (
    <ExpenseContext.Provider
      value={{
        budget,
        expenses,
        total,
        remaining,
        isSaving,
        saveBudget,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}