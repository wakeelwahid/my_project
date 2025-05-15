import React, { useState } from 'react';
import './AdminDashboard.css';
import './Panels/panels.css';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faGamepad, faMoneyBillTransfer, 
  faChartLine, faCog, faSignOutAlt, faTachometerAlt,
  faMoon, faSun, faTimes, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import UsersPanel from './Panels/UsersPanel';
import GamesPanel from './Panels/GamesPanel';
import TransactionsPanel from './Panels/TransactionsPanel';
import AnalyticsPanel from './Panels/AnalyticsPanel';
import SettingsPanel from './Panels/SettingsPanel';
import DepositRequestPanel from './Panels/DepositRequestPanel';
import WithdrawRequestPanel from './Panels/WithdrawRequestPanel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState('analytics');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode');
  };

  const renderPanel = () => {
    switch(activePanel) {
      case 'users': return <UsersPanel />;
      case 'games': return <GamesPanel />;
      case 'transactions': return <TransactionsPanel />;
      case 'analytics': return <AnalyticsPanel />;
      case 'settings': return <SettingsPanel />;
      case 'deposits': return <DepositRequestPanel />;
      case 'withdrawals': return <WithdrawRequestPanel />;
      default: return <AnalyticsPanel />;
    }
  };

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className={`admin-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <FontAwesomeIcon icon={faTachometerAlt} className="dashboard-icon" />
            <h2>Admin Panel</h2>
          </div>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav className="admin-nav">
          <button 
            className={`nav-item ${activePanel === 'analytics' ? 'active' : ''}`}
            onClick={() => setActivePanel('analytics')}
          >
            <FontAwesomeIcon icon={faChartLine} /> Overview
          </button>
          <button 
            className={`nav-item ${activePanel === 'users' ? 'active' : ''}`}
            onClick={() => setActivePanel('users')}
          >
            <FontAwesomeIcon icon={faUsers} /> Users
          </button>
          <button 
            className={`nav-item ${activePanel === 'games' ? 'active' : ''}`}
            onClick={() => setActivePanel('games')}
          >
            <FontAwesomeIcon icon={faGamepad} /> Games
          </button>
          <button 
            className={`nav-item ${activePanel === 'transactions' ? 'active' : ''}`}
            onClick={() => setActivePanel('transactions')}
          >
            <FontAwesomeIcon icon={faMoneyBillTransfer} /> Transactions
          </button>
          <button 
            className={`nav-item ${activePanel === 'deposits' ? 'active' : ''}`}
            onClick={() => setActivePanel('deposits')}
          >
            <FontAwesomeIcon icon={faArrowUp} /> Deposit Requests
          </button>
          <button 
            className={`nav-item ${activePanel === 'withdrawals' ? 'active' : ''}`}
            onClick={() => setActivePanel('withdrawals')}
          >
            <FontAwesomeIcon icon={faArrowDown} /> Withdraw Requests
          </button>
          <button 
            className={`nav-item ${activePanel === 'settings' ? 'active' : ''}`}
            onClick={() => setActivePanel('settings')}
          >
            <FontAwesomeIcon icon={faCog} /> Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? ' Light Mode' : ' Dark Mode'}
          </button>
          <button className="logout-btn">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>

      <div className="admin-main">
        {!sidebarOpen && (
          <button className="open-sidebar" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
        )}
        {renderPanel()}
      </div>
    </div>
  );
};

export default AdminDashboard;