
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMoneyBillWave, faArrowUp, faArrowDown, faChartLine, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const options = {
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
  };

  return (
    <div className="panel">
      <div className="stats-grid">
        <div className="stat-box">
          <FontAwesomeIcon icon={faMoneyBillWave} className="stat-icon" />
          <div className="stat-info">
            <h3>Total Deposits</h3>
            <div className="stat-value">₹2,50,000</div>
          </div>
        </div>

        <div className="stat-box">
          <FontAwesomeIcon icon={faHandHoldingDollar} className="stat-icon" />
          <div className="stat-info">
            <h3>Total Withdrawals</h3>
            <div className="stat-value">₹1,80,000</div>
          </div>
        </div>

        <div className="stat-box">
          <FontAwesomeIcon icon={faArrowUp} className="stat-icon" />
          <div className="stat-info">
            <h3>Deposit Requests</h3>
            <div className="stat-value">25</div>
          </div>
        </div>

        <div className="stat-box">
          <FontAwesomeIcon icon={faArrowDown} className="stat-icon" />
          <div className="stat-info">
            <h3>Withdrawal Requests</h3>
            <div className="stat-value">18</div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-info">
            <h3>Today's Stats</h3>
            <div className="stat-subgrid">
              <div>
                <p>New Users</p>
                <span>45</span>
              </div>
              <div>
                <p>Earnings</p>
                <span>₹25,000</span>
              </div>
              <div>
                <p>Deposits</p>
                <span>₹50,000</span>
              </div>
              <div>
                <p>Withdrawals</p>
                <span>₹35,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-info">
            <h3>Weekly Stats</h3>
            <div className="stat-subgrid">
              <div>
                <p>Earnings</p>
                <span>₹1,75,000</span>
              </div>
              <div>
                <p>Deposits</p>
                <span>₹3,50,000</span>
              </div>
              <div>
                <p>Withdrawals</p>
                <span>₹2,45,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-info">
            <h3>Monthly Stats</h3>
            <div className="stat-subgrid">
              <div>
                <p>Earnings</p>
                <span>₹7,50,000</span>
              </div>
              <div>
                <p>Deposits</p>
                <span>₹15,00,000</span>
              </div>
              <div>
                <p>Withdrawals</p>
                <span>₹10,50,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <Line data={dailyEarningData} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsPanel;
