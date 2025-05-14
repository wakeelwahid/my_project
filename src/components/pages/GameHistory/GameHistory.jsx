import React from 'react'
import './GameHistory.css'

const GameHistory = () => {
  return (
    <>
    <div className="game-history-container">
  {/* Floating Numbers (static positions) */}
  <div
    className="floating-number"
    style={{ left: "10vw", top: "20vh", animationDelay: "0.5s" }}
  >
    7
  </div>
  <div
    className="floating-number"
    style={{ left: "25vw", top: "40vh", animationDelay: "1.2s" }}
  >
    3
  </div>
  <div
    className="floating-number"
    style={{ left: "75vw", top: "30vh", animationDelay: "2.8s" }}
  >
    9
  </div>
  <div
    className="floating-number"
    style={{ left: "50vw", top: "70vh", animationDelay: "0.8s" }}
  >
    1
  </div>
  <div
    className="floating-number"
    style={{ left: "85vw", top: "60vh", animationDelay: "3.5s" }}
  >
    5
  </div>
  <header className="history-header">
    <h1 className="history-title">GAME HISTORY</h1>
  </header>
  <div className="filter-controls">
    <div className="filter-group">
      <span className="filter-label">Game:</span>
      <select className="filter-select">
        <option value="all">All Games</option>
        <option value="GALI">Gali</option>
        <option value="DISAWAR">Disawar</option>
        <option value="FARIDABAD">Faridabad</option>
      </select>
    </div>
    <div className="filter-group">
      <span className="filter-label">Date:</span>
      <select className="filter-select">
        <option value="all">All Dates</option>
        <option value="2023-06-20">June 20, 2023</option>
        <option value="2023-06-19">June 19, 2023</option>
      </select>
    </div>
  </div>
  {/* Game 1 */}
  <div className="game-card">
    <div className="game-header">
      <div className="game-name">GALI</div>
      <div className="game-date">2023-06-20 | 12:30 PM</div>
    </div>
    <div className="game-numbers">
      <div className="number-ball">
        5<div className="bet-amount">₹1500</div>
      </div>
      <div className="number-ball winning-number">
        8<div className="bet-amount">₹2000</div>
      </div>
      <div className="number-ball">
        2<div className="bet-amount">₹1000</div>
      </div>
      <div className="number-ball jodi-number">
        58
        <div className="bet-amount">₹5000</div>
      </div>
      
    </div>
    <div className="game-details">
      
      <div className="detail-item">
        <div>
        <div className="detail-label">Total Amount</div>
        <div className="detail-value total-amount">₹9500</div>
        </div>
        <div>
        <div className="detail-label">Winning Amount</div>
        <div className="detail-value total-amount">₹9500</div>
        </div>
      </div>
    
    </div>
    <div className="winning-info">
      <div className="winning-number-display">
        Winning Number: <span className="winning-number-value">8</span>
        
      </div>
      
    </div>
  </div>
  {/* Game 2 */}
  <div className="game-card">
    <div className="game-header">
      <div className="game-name">DISAWAR</div>
      <div className="game-date">2023-06-20 | 02:15 PM</div>
    </div>
    <div className="game-numbers">
      <div className="number-ball">
        9<div className="bet-amount">₹2500</div>
      </div>
      <div className="number-ball winning-number">
        3<div className="bet-amount">₹1500</div>
      </div>
      <div className="number-ball">
        7<div className="bet-amount">₹3000</div>
      </div>
      <div className="number-ball jodi-number">
        93
        <div className="bet-amount">₹6000</div>
      </div>
    </div>
    <div className="game-details">
      
      <div className="detail-item">
        <div>
        <div className="detail-label">Total Amount</div>
        <div className="detail-value total-amount">₹13000</div>
        </div>
        <div>
        <div className="detail-label">Winning Amount</div>
        <div className="detail-value total-amount">₹13000</div>
        </div>
      </div>
    </div>
    <div className="winning-info">
      <div className="winning-number-display">
        Winning Number: <span className="winning-number-value">3</span>
      </div>
    </div>
  </div>
  {/* Game 3 */}
  <div className="game-card">
    <div className="game-header">
      <div className="game-name">FARIDABAD</div>
      <div className="game-date">2023-06-19 | 05:45 PM</div>
    </div>
    <div className="game-numbers">
      <div className="number-ball">
        4<div className="bet-amount">₹1800</div>
      </div>
      <div className="number-ball winning-number">
        1<div className="bet-amount">₹2200</div>
      </div>
      <div className="number-ball">
        6<div className="bet-amount">₹1500</div>
      </div>
      <div className="number-ball jodi-number">
        41
        <div className="bet-amount">₹4500</div>
      </div>
    </div>
    <div className="game-details">
      
      <div className="detail-item">
      <div>
        <div className="detail-label">Total Amount</div>
        <div className="detail-value total-amount">₹10000</div>
        </div>
        <div>
        <div className="detail-label">Winning Amount</div>
        <div className="detail-value total-amount">₹10000</div>
        </div>
      </div>
    </div>
    <div className="winning-info">
      <div className="winning-number-display">
        Winning Number: <span className="winning-number-value">1</span>
      </div>
    </div>
  </div>
  <div className="pagination">
    <button className="page-btn">&lt;</button>
    <button className="page-btn active">1</button>
    <button className="page-btn">2</button>
    <button className="page-btn">3</button>
    <button className="page-btn">&gt;</button>
  </div>
</div>
</>
  )
}

export default GameHistory
