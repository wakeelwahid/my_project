
import React from 'react';

const UsersPanel = () => {
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>9876543210</td>
              <td>₹5000</td>
              <td>Active</td>
              <td>
                <button className="action-btn">Edit</button>
                <button className="action-btn delete">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
