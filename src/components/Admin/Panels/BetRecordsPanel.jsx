
import React, { useState } from 'react';
import './panels.css';

const BetRecordsPanel = () => {
  // Sample data - replace with actual data from your backend
  const games = ['RAJDHANI DAY', 'MILAN DAY', 'KALYAN', 'MAIN BAZAR'];
  const [selectedGame, setSelectedGame] = useState(games[0]);
  
  const betRecords = {
    'RAJDHANI DAY': {
      totalBets: 156,
      totalAmount: 78000,
      numberWiseBets: {
        '00': { count: 12, amount: 6000 },
        '28': { count: 15, amount: 7500 },
        '45': { count: 8, amount: 4000 },
        '67': { count: 20, amount: 10000 },
        '99': { count: 10, amount: 5000 },
      }
    },
    'MILAN DAY': {
      totalBets: 120,
      totalAmount: 60000,
      numberWiseBets: {
        '11': { count: 10, amount: 5000 },
        '33': { count: 12, amount: 6000 },
        '55': { count: 15, amount: 7500 },
        '77': { count: 8, amount: 4000 },
      }
    }
  };

  return (
    <div className="panel">
      <h2>Bet Records</h2>
      
      <div className="bet-records-controls">
        <select 
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="game-select"
        >
          {games.map(game => (
            <option key={game} value={game}>{game}</option>
          ))}
        </select>
      </div>

      {betRecords[selectedGame] && (
        <div className="bet-records-summary">
          <div className="summary-card">
            <h3>Total Bets</h3>
            <p>{betRecords[selectedGame].totalBets}</p>
          </div>
          <div className="summary-card">
            <h3>Total Amount</h3>
            <p>₹{betRecords[selectedGame].totalAmount}</p>
          </div>
        </div>
      )}

      <div className="bet-records-table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Total Bets</th>
              <th>Total Amount</th>
              <th>Andar</th>
              <th>Bahar</th>
            </tr>
          </thead>
          <tbody>
            {betRecords[selectedGame]?.numberWiseBets && 
              Object.entries(betRecords[selectedGame].numberWiseBets).map(([number, data]) => (
                <tr key={number}>
                  <td>{number}</td>
                  <td>{data.count}</td>
                  <td>₹{data.amount}</td>
                  <td>{Math.floor(data.count / 2)}</td>
                  <td>{Math.ceil(data.count / 2)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetRecordsPanel;
