
import React, { useState } from 'react';
import './panels.css';

const TransactionsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions] = useState([
    {
      id: 1,
      user: "John Doe",
      type: "Deposit",
      amount: "₹1000",
      status: "Completed",
      date: "2024-03-19",
      utrNumber: "UTR123456789"
    },
    {
      id: 2,
      user: "Alice Smith",
      type: "Withdraw",
      amount: "₹2000",
      status: "Pending",
      date: "2024-03-18",
      utrNumber: "UTR987654321"
    },
    {
      id: 3,
      user: "Bob Wilson",
      type: "Deposit",
      amount: "₹3000",
      status: "Completed",
      date: "2024-03-17",
      utrNumber: "UTR456789123"
    }
  ]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.includes(searchTerm) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.date.includes(searchTerm) ||
    transaction.utrNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="panel">
      <h2>Transactions</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="panel-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>UTR Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.user}</td>
                <td>{transaction.type}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.date}</td>
                <td>{transaction.utrNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPanel;
