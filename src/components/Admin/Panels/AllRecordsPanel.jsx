
import React from 'react';
import './panels.css';

const AllRecordsPanel = ({ onClose }) => {
  return (
    <div className="all-records-overlay">
      <div className="all-records-modal">
        <div className="modal-header">
          <h2>Complete Transaction Records</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="records-tabs">
          <div className="records-section">
            <h3>Transaction Records</h3>
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data - replace with actual data */}
                <tr>
                  <td>2024-03-20</td>
                  <td>Rahul Kumar</td>
                  <td>Deposit</td>
                  <td className="amount-positive">₹5,000</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>2024-03-20</td>
                  <td>Priya Sharma</td>
                  <td>Withdrawal</td>
                  <td className="amount-negative">₹3,000</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="records-section">
            <h3>User Statistics</h3>
            <div className="stats-summary">
              <div className="stat-item">
                <span>Total Users:</span>
                <span>15,234</span>
              </div>
              <div className="stat-item">
                <span>Active Users:</span>
                <span>8,567</span>
              </div>
              <div className="stat-item">
                <span>New Users (Today):</span>
                <span>45</span>
              </div>
            </div>
          </div>

          <div className="records-section">
            <h3>Admin Actions Log</h3>
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Admin</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-03-20</td>
                  <td>Admin1</td>
                  <td>Approved Withdrawal</td>
                  <td>User: Priya - ₹3,000</td>
                </tr>
                <tr>
                  <td>2024-03-20</td>
                  <td>Admin2</td>
                  <td>Updated Settings</td>
                  <td>Game Rules Modified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRecordsPanel;
