import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = () => {
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid description and amount');
      return;
    }

    onAddTransaction({
      id: Date.now(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      date: new Date().toLocaleDateString()
    });

    setDescription('');
    setAmount('');
    setType('income');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="card">
      <h2 className="section-title">
        <svg className="section-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Add Transaction
      </h2>

      <div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="e.g., Salary, Groceries"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="income"
                checked={type === 'income'}
                onChange={(e) => setType(e.target.value)}
              />
              Income
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="expense"
                checked={type === 'expense'}
                onChange={(e) => setType(e.target.value)}
              />
              Expense
            </label>
          </div>
        </div>

        <button onClick={handleSubmit} className="btn btn-primary">
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
