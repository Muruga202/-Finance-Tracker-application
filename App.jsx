import React, { useState } from 'react';
import MathBackground from './components/MathBackground';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);

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
          <h1>Finance Tracker</h1>
          <p>Calculate your wealth with mathematical precision</p>
        </header>

        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg-grid-cols-3">
          <div className="lg-col-span-1">
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          
          <div className="lg-col-span-2">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
