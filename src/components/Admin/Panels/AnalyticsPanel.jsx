import React from 'react';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faMoneyBillWave, faHandHoldingDollar,
  faArrowUp, faArrowDown, faUserPlus, faShare
} from '@fortawesome/free-solid-svg-icons';

const AnalyticsPanel = () => {
  const dailyEarningData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Earnings',
      data: [12500, 19000, 15000, 22000, 18000, 25000, 20000],
      borderColor: '#FFD700',
      tension: 0.4
    }]
  };

  return (
    <div className="panel">
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faUsers} /> Total Users
          </div>
          <div className="stat-value">15,234</div>
        </div>

        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faUserPlus} /> Today's New Users
          </div>
          <div className="stat-value">45</div>
        </div>

        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faShare} /> Total Referrals
          </div>
          <div className="stat-value">2,567</div>
        </div>

        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faMoneyBillWave} /> Referral Earnings
          </div>
          <div className="stat-value">₹85,420</div>
        </div>
      </div>

      <div className="request-list">
        <h3>Pending Requests</h3>
        <div className="stat-box">
          <div className="request-item">
            <span>Deposit Requests</span>
            <strong>23 Pending</strong>
          </div>
          <div className="request-item">
            <span>Withdrawal Requests</span>
            <strong>15 Pending</strong>
          </div>
        </div>
      </div>

      <div className="user-list">
        <h3>Recent Users</h3>
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Referrals</th>
              <th>Earnings</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>15</td>
              <td>₹12,500</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>23</td>
              <td>₹18,900</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="chart-container">
        <Line data={dailyEarningData} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Daily Earnings Overview'
            }
          }
        }} />
      </div>
    </div>
  );
};

export default AnalyticsPanel;