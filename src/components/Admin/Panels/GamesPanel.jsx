
import React from 'react';

const GamesPanel = () => {
  return (
    <div className="panel">
      <h2>Games Management</h2>
      <div className="panel-content">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Name</th>
              <th>Open Time</th>
              <th>Close Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Desawar</td>
              <td>05:15 PM</td>
              <td>05:00 PM</td>
              <td>Active</td>
              <td>
                <button className="action-btn">Edit</button>
                <button className="action-btn delete">Disable</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamesPanel;
