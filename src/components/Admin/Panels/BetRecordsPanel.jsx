
import React, { useState } from 'react';
import './panels.css';

const BetRecordsPanel = () => {
  // Sample data - replace with actual data from your backend
  const games = ['RAJDHANI DAY', 'MILAN DAY', 'KALYAN', 'MAIN BAZAR'];
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [filterType, setFilterType] = useState('none'); // none, min, max
  
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
          className="game-select dark"
        >
          {games.map(game => (
            <option key={game} value={game}>{game}</option>
          ))}
        </select>
        
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filterType === 'min' ? 'active' : ''}`}
            onClick={() => setFilterType(filterType === 'min' ? 'none' : 'min')}
          >
            Min Amount
          </button>
          <button 
            className={`filter-btn ${filterType === 'max' ? 'active' : ''}`}
            onClick={() => setFilterType(filterType === 'max' ? 'none' : 'max')}
          >
            Max Amount
          </button>
        </div>
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
          <div className="summary-card andar">
            <h3>Andar Total</h3>
            <p>₹{Object.values(betRecords[selectedGame].numberWiseBets)
              .reduce((sum, data) => sum + (data.andarAmount || 0), 0)}</p>
          </div>
          <div className="summary-card bahar">
            <h3>Bahar Total</h3>
            <p>₹{Object.values(betRecords[selectedGame].numberWiseBets)
              .reduce((sum, data) => sum + (data.baharAmount || 0), 0)}</p>
          </div>
        </div>
      )}

      <div className="bet-records-table">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Total Amount</th>
              <th>Andar Amount</th>
              <th>Bahar Amount</th>
            </tr>
          </thead>
          <tbody>
            {betRecords[selectedGame]?.numberWiseBets && 
              Object.entries(betRecords[selectedGame].numberWiseBets)
                .sort((a, b) => {
                  if (filterType === 'min') {
                    return a[1].amount - b[1].amount;
                  } else if (filterType === 'max') {
                    return b[1].amount - a[1].amount;
                  }
                  return 0;
                })
                .map(([number, data]) => (
                <tr key={number}>
                  <td>{number}</td>
                  <td>₹{data.amount}</td>
                  <td>₹{data.andarAmount || 0}</td>
                  <td>₹{data.baharAmount || 0}</td>
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
