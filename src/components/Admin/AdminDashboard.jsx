
import React, { useState } from 'react';
import './AdminDashboard.css';
import './Panels/panels.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faGamepad, faMoneyBillTransfer, 
  faChartLine, faCog, faSignOutAlt, faTachometerAlt 
} from '@fortawesome/free-solid-svg-icons';
import UsersPanel from './Panels/UsersPanel';
import GamesPanel from './Panels/GamesPanel';
import TransactionsPanel from './Panels/TransactionsPanel';
import AnalyticsPanel from './Panels/AnalyticsPanel';
import SettingsPanel from './Panels/SettingsPanel';

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState('analytics');

  const renderPanel = () => {
    switch(activePanel) {
      case 'users': return <UsersPanel />;
      case 'games': return <GamesPanel />;
      case 'transactions': return <TransactionsPanel />;
      case 'analytics': return <AnalyticsPanel />;
      case 'settings': return <SettingsPanel />;
      default: return <AnalyticsPanel />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <FontAwesomeIcon icon={faTachometerAlt} className="dashboard-icon" />
          <h2>Admin Panel</h2>
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
            className={`nav-item ${activePanel === 'settings' ? 'active' : ''}`}
            onClick={() => setActivePanel('settings')}
          >
            <FontAwesomeIcon icon={faCog} /> Settings
          </button>
        </nav>
        <button className="logout-btn">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
      <div className="admin-main">
        {renderPanel()}
      </div>
    </div>
  );
};

export default AdminDashboard;
