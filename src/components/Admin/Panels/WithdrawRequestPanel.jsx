
import React, { useState } from 'react';
import './panels.css';

const WithdrawRequestPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [withdrawals] = useState([
    {
      id: 1,
      user: "John Doe",
      amount: 2000,
      wallet: "9876543210@upi",
      date: "2024-03-21",
      time: "14:30",
      status: "pending"
    },
    {
      id: 2,
      user: "Alice Smith",
      amount: 5000,
      wallet: "alice@bankname",
      status: "pending"
    }
  ]);

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      withdrawal.user.toLowerCase().includes(searchTermLower) ||
      withdrawal.wallet.toLowerCase().includes(searchTermLower) ||
      withdrawal.amount.toString().includes(searchTerm) ||
      withdrawal.date?.includes(searchTerm) ||
      (withdrawal.time && withdrawal.time.toLowerCase().includes(searchTermLower)) ||
      withdrawal.status.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="panel">
      <h2>Withdrawal Requests</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user, wallet, or status..."
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
              <th>Amount</th>
              <th>Wallet</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWithdrawals.map(withdrawal => (
              <tr key={withdrawal.id}>
                <td>{withdrawal.id}</td>
                <td>{withdrawal.user}</td>
                <td>₹{withdrawal.amount}</td>
                <td>{withdrawal.wallet}</td>
                <td>{withdrawal.date}</td>
                <td>{withdrawal.time}</td>
                <td>{withdrawal.status}</td>
                <td>
                  <div className='set-btn'> <button className="action-btn approve">Approve</button>
                    <button className="action-btn reject">Reject</button></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequestPanel;
