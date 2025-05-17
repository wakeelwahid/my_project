
import React from 'react';

const SettingsPanel = () => {
  return (
    <div className="panel">
      <h2>Settings</h2>
      <div className="panel-content">
        <form className="settings-form">
          <div className="form-group">
            <label>Site Name</label>
            <input type="text" defaultValue="Satta King" />
          </div>
          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" defaultValue="support@example.com" />
          </div>
          <div className="form-group">
            <label>Minimum Withdrawal</label>
            <input type="number" defaultValue="500" />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPanel;
