import React, { useState, useEffect } from 'react';
import MathBackground from './Component/MathBackground';
import SummaryCards from './Component/SummaryCards';
import TransactionForm from './Component/TransactionForm';
import TransactionList from './Component/TransactionList';
import Filter from './Component/Filter';
import Charts from './Component/Charts';
import DarkModeToggle from './Component/DarkModeToggle';
import { addWeeks, addMonths } from 'date-fns';
import Papa from 'papaparse';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ dateFrom: null, dateTo: null, category: 'all', search: '' });

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const matchesDate = (!filters.dateFrom || transactionDate >= filters.dateFrom) &&
                          (!filters.dateTo || transactionDate <= filters.dateTo);
      const matchesCategory = filters.category === 'all' || transaction.category === filters.category;
      const matchesSearch = !filters.search || transaction.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchesDate && matchesCategory && matchesSearch;
    });
  };

  const handleExport = () => {
    const data = getFilteredTransactions().map(t => ({
      Date: t.date,
      Description: t.description,
      Amount: t.amount,
      Type: t.type,
      Category: t.category
    }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <MathBackground />
      
      <div className="max-width">
        <header className="header">
          <div className="header-content">
            <div>
              <h1>Finance Tracker</h1>
              <p>Calculate your wealth with mathematical precision</p>
            </div>
            <DarkModeToggle />
          </div>
        </header>

        <Filter onFilterChange={setFilters} onExport={handleExport} />

        <SummaryCards transactions={getFilteredTransactions()} />

        <Charts transactions={getFilteredTransactions()} />

        <div className="grid grid-cols-1 lg-grid-cols-3">
          <div className="lg-col-span-1">
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          
          <div className="lg-col-span-2">
           <TransactionList
             transactions={getFilteredTransactions()}
             onDeleteTransaction={deleteTransaction}
           />
         </div>
        </div>
      </div>
    </div>
  );
}

export default App;
