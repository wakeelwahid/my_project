
import React, { useState } from 'react';
import './panels.css';

const DepositRequestPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deposits] = useState([
    {
      id: 1,
      user: "John Doe",
      amount: 5000,
      date: "2024-03-20",
      time: "14:30",
      utrNumber: "UTR123456789",
      status: "pending"
    },
    {
      id: 2,
      user: "Alice Smith",
      amount: 3000,
      date: "2024-03-20",
      time: "15:45",
      utrNumber: "UTR987654321",
      status: "approved"
    }
  ]);

  const filteredDeposits = deposits.filter(deposit =>
    deposit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.amount.toString().includes(searchTerm) ||
    deposit.date.includes(searchTerm) ||
    deposit.time.includes(searchTerm) ||
    deposit.utrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deposit.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="panel">
      <h2>Deposit Requests</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user, UTR, or status..."
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
              <th>Date</th>
              <th>Time</th>
              <th>UTR Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.map(deposit => (
              <tr key={deposit.id}>
                <td>{deposit.id}</td>
                <td>{deposit.user}</td>
                <td>₹{deposit.amount}</td>
                <td>{deposit.date}</td>
                <td>{deposit.time}</td>
                <td>{deposit.utrNumber}</td>
                <td>{deposit.status}</td>
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

export default DepositRequestPanel;
