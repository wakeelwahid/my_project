
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMoneyBillWave, faGamepad, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const AnalyticsPanel = () => {
  return (
    <div className="panel">
      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <div className="stat-value">24,789</div>
            <div className="stat-change positive">
              <FontAwesomeIcon icon={faArrowUp} /> +12.5%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faMoneyBillWave} />
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <div className="stat-value">₹12,50,000</div>
            <div className="stat-change positive">
              <FontAwesomeIcon icon={faArrowUp} /> +8.2%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FontAwesomeIcon icon={faGamepad} />
          </div>
          <div className="stat-info">
            <h3>Active Games</h3>
            <div className="stat-value">18</div>
            <div className="stat-change positive">
              <FontAwesomeIcon icon={faArrowUp} /> +5.3%
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h2>Revenue Overview</h2>
        <div className="chart-placeholder">
          Revenue chart will be displayed here
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
