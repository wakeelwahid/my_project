
import React from 'react';

const AnalyticsPanel = () => {
  return (
    <div className="panel">
      <h2>Analytics</h2>
      <div className="panel-content">
        <div className="analytics-cards">
          <div className="analytics-card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="analytics-card">
            <h3>Total Revenue</h3>
            <p>₹50,000</p>
          </div>
          <div className="analytics-card">
            <h3>Active Games</h3>
            <p>8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
