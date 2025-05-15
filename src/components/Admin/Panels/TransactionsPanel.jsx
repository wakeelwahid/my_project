
import React from 'react';

const TransactionsPanel = () => {
  return (
    <div className="panel">
      <h2>Transactions</h2>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Deposit</td>
              <td>₹1000</td>
              <td>Completed</td>
              <td>2024-03-19</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPanel;
