import React from 'react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="card">
      <h2 className="section-title">
        <svg className="section-icon" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        Transaction History
      </h2>

      {transactions.length === 0 ? (
        <div className="empty-state">
          No transactions yet. Add your first transaction above!
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-details">
                <p className="transaction-description">{transaction.description}</p>
                <p className="transaction-category">{transaction.category}</p>
                <p className="transaction-date">{transaction.date}</p>
              </div>
              
              <div className="transaction-right">
                <p className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="btn-delete"
                  title="Delete transaction"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
