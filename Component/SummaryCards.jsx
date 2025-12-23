import React from 'react';

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md-grid-cols-3" style={{ marginBottom: '1.5rem' }}>
      {/* Income Card */}
      <div className="summary-card income">
        <div className="summary-content">
          <div>
            <p className="summary-label">Total Income</p>
            <p className="summary-value">${income.toFixed(2)}</p>
          </div>
          <svg className="summary-icon" fill="none" stroke="#86efac" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
        </div>
      </div>

      {/* Expense Card */}
      <div className="summary-card expense">
        <div className="summary-content">
          <div>
            <p className="summary-label">Total Expenses</p>
            <p className="summary-value">${expenses.toFixed(2)}</p>
          </div>
          <svg className="summary-icon" fill="none" stroke="#fca5a5" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
            <polyline points="17 18 23 18 23 12"></polyline>
          </svg>
        </div>
      </div>

      {/* Balance Card */}
      <div className="summary-card balance">
        <div className="summary-content">
          <div>
            <p className="summary-label">Balance</p>
            <p className={`summary-value ${balance >= 0 ? 'positive' : 'negative'}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
          <svg className="summary-icon" fill="none" stroke="#d8b4fe" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
