
import React, { useState } from 'react';
import './panels.css';

const UsersPanel = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      mobile: "9876543210",
      balance: 5000,
      totalDeposit: 15000,
      totalWithdraw: 10000,
      totalEarning: 8000,
      todayDeposit: 1000,
      todayWithdraw: 500,
      totalReferrals: 5,
      referralEarnings: 2500,
      status: "active"
    }
  ]);

  const handleBlockUser = (userId) => {
    // Implement user blocking logic
    console.log("Blocking user:", userId);
  };

  const handleUnblockUser = (userId) => {
    // Implement user unblocking logic
    console.log("Unblocking user:", userId);
  };

  const handleRemoveUser = (userId) => {
    // Implement user removal logic
    console.log("Removing user:", userId);
  };

  return (
    <div className="panel">
      <h2>Users Management</h2>
      <div className="panel-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Balance</th>
              <th>Total Deposit</th>
              <th>Total Withdraw</th>
              <th>Total Earning</th>
              <th>Today Deposit</th>
              <th>Today Withdraw</th>
              <th>Total Referrals</th>
              <th>Referral Earnings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>₹{user.balance}</td>
                <td>₹{user.totalDeposit}</td>
                <td>₹{user.totalWithdraw}</td>
                <td>₹{user.totalEarning}</td>
                <td>₹{user.todayDeposit}</td>
                <td>₹{user.todayWithdraw}</td>
                <td>{user.totalReferrals}</td>
                <td>₹{user.referralEarnings}</td>
                <td>{user.status}</td>
                <td className="action-buttons">
                  {user.status === 'active' ? (
                    <button 
                      className="action-btn delete" 
                      onClick={() => handleBlockUser(user.id)}
                    >
                      Block
                    </button>
                  ) : (
                    <button 
                      className="action-btn" 
                      onClick={() => handleUnblockUser(user.id)}
                    >
                      Unblock
                    </button>
                  )}
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
