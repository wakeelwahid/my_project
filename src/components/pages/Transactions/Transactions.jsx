
import React, { useState } from "react";
import "./Transactions.css";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions] = useState([
    {
      id: 1,
      date: "2023-06-15",
      time: "10:24 AM",
      type: "deposit",
      amount: "+₹5000",
      status: "completed",
      utrNumber: "UTR123456789"
    },
    {
      id: 2,
      date: "2023-06-14",
      time: "10:24 AM",
      type: "withdraw",
      amount: "-₹2000",
      status: "completed",
      utrNumber: "UTR987654321"
    },
    {
      id: 3,
      date: "2023-06-12",
      time: "10:24 AM",
      type: "deposit",
      amount: "+₹10000",
      status: "completed",
      utrNumber: "UTR456789123"
    }
  ]);

  const filteredTransactions = transactions.filter(transaction =>
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.includes(searchTerm) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.date.includes(searchTerm) ||
    transaction.utrNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="transactions-container">
      <div className="transactions-content">
        <header className="transactions-header">
          <h1 className="transactions-title">TRANSACTION HISTORY</h1>
        </header>
        <div className="transaction-card">
          <h2 className="card-title">Your Transactions</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>UTR Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.date} / <span>{transaction.time}</span></td>
                    <td>{transaction.type}</td>
                    <td className={transaction.amount.startsWith('+') ? 'credit' : 'debit'}>
                      {transaction.amount}
                    </td>
                    <td className={transaction.status === 'pending' ? 'status-pending' : ''}>
                      {transaction.status}
                    </td>
                    <td>{transaction.utrNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
