import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faMoneyBillWave, faHandHoldingDollar,
  faArrowUp, faArrowDown, faUserPlus, faTrophy
} from '@fortawesome/free-solid-svg-icons';
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
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#fff' }
      }
    },
    scales: {
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  const earningData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Earnings',
      data: [12500, 19000, 15000, 22000, 18000, 25000, 20000],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true
    }]
  };

  const userActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'New Users',
      data: [45, 62, 38, 74, 52, 69, 84],
      backgroundColor: '#2196F3',
    }]
  };

  return (
    <div className="analytics-panel">
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faUsers} /> Total Users
          </div>
          <div className="stat-value">15,234</div>
        </div>
        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faMoneyBillWave} /> Total Revenue
          </div>
          <div className="stat-value">₹1,234,567</div>
        </div>
        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faHandHoldingDollar} /> Today's Earnings
          </div>
          <div className="stat-value">₹25,430</div>
        </div>
        <div className="stat-box">
          <div className="stat-title">
            <FontAwesomeIcon icon={faUserPlus} /> New Users Today
          </div>
          <div className="stat-value">84</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Revenue Analytics</h3>
          <Line data={earningData} options={chartOptions} />
        </div>
        <div className="chart-box">
          <h3>User Growth</h3>
          <Bar data={userActivityData} options={chartOptions} />
        </div>
      </div>

      <div className="recent-data-grid">
        <div className="recent-box">
          <h3>Recent Transactions</h3>
          <div className="recent-list">
            {[
              { user: 'John Doe', amount: '₹5,000', type: 'Deposit', time: '5 min ago' },
              { user: 'Alice Smith', amount: '₹3,500', type: 'Withdrawal', time: '12 min ago' },
              { user: 'Bob Wilson', amount: '₹7,800', type: 'Deposit', time: '25 min ago' },
            ].map((tx, i) => (
              <div key={i} className="recent-item">
                <div className="item-user">{tx.user}</div>
                <div className="item-details">
                  <span className={tx.type === 'Deposit' ? 'amount-positive' : 'amount-negative'}>
                    {tx.amount}
                  </span>
                  <span className="item-time">{tx.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="recent-box">
          <h3>Recent Winners</h3>
          <div className="recent-list">
            {[
              { user: 'Mike Johnson', game: 'MILAN DAY', amount: '₹12,000', time: '2 min ago' },
              { user: 'Sarah Davis', game: 'RAJDHANI', amount: '₹8,500', time: '15 min ago' },
              { user: 'Tom Brown', game: 'KALYAN', amount: '₹15,000', time: '30 min ago' },
            ].map((winner, i) => (
              <div key={i} className="recent-item">
                <div className="item-user">
                  <FontAwesomeIcon icon={faTrophy} className="winner-icon" /> {winner.user}
                </div>
                <div className="item-details">
                  <span className="game-name">{winner.game}</span>
                  <span className="amount-positive">{winner.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;