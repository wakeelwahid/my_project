import React from 'react'
import "./MyBet.css"

const MyBet = () => {
  return (
   <>
  
  <header>
    <div className="bet-logo">
      My <span>Bets</span>
    </div>
  </header>
  <div className="my-container">
    
    
    {/* Current Bet */}
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230615</span>
        <span className="bet-date">15/06/2023 14:30:45</span>
      </div>
      <div className="bet-market">GALI</div>
      <div className="bet-numbers">
        <div className="bet-number-chip andar">
          45 ₹1000
          <span className="bet-section-mark">A</span>
        </div>
        <div className="bet-number-chip bahar">
          45 ₹1000
          <span className="bet-section-mark">B</span>
        </div>
        <div className="bet-number-chip">78 ₹500</div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-pending">Pending</span>
        <span className="bet-amount">Total Numbers: 2</span>
        <span className="bet-payout">amount: ₹0</span>
      </div>
    </div>
    {/* Previous Bets */}
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230614</span>
        <span className="bet-date">14/06/2023 14:25:12</span>
      </div>
      <div className="bet-market">MUMBAI DAY</div>
      <div className="bet-numbers">
        <div className="bet-number-chip bahar">
          23 (₹2000)
          <span className="bet-section-mark">B</span>
        </div>
        <div className="bet-number-chip">56 (₹1000)</div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-won">Won</span>
        <span className="bet-amount">Total: ₹3000</span>
        <span className="bet-payout">Payout: ₹9000</span>
      </div>
    </div>
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230613</span>
        <span className="bet-date">13/06/2023 14:28:33</span>
      </div>
      <div className="bet-market">KALYAN DAY</div>
      <div className="bet-numbers">
        <div className="bet-number-chip andar">
          12 (₹1500)
          <span className="bet-section-mark">A</span>
        </div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-lost">Lost</span>
        <span className="bet-amount">Total: ₹1500</span>
        <span className="bet-payout">Payout: ₹0</span>
      </div>
    </div>
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230612</span>
        <span className="bet-date">12/06/2023 14:31:18</span>
      </div>
      <div className="bet-market">RAJDHANI NIGHT</div>
      <div className="bet-numbers">
        <div className="bet-number-chip">89 (₹2000)</div>
        <div className="bet-number-chip bahar">
          34 (₹500)
          <span className="bet-section-mark">B</span>
        </div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-won">Won</span>
        <span className="bet-amount">Total: ₹2500</span>
        <span className="bet-payout">Payout: ₹7500</span>
      </div>
    </div>
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230611</span>
        <span className="bet-date">11/06/2023 14:27:45</span>
      </div>
      <div className="bet-market">MILAN DAY</div>
      <div className="bet-numbers">
        <div className="bet-number-chip andar">
          7 (₹1000)
          <span className="bet-section-mark">A</span>
        </div>
        <div className="bet-number-chip bahar">
          7 (₹1000)
          <span className="bet-section-mark">B</span>
        </div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-lost">Lost</span>
        <span className="bet-amount">Total: ₹2000</span>
        <span className="bet-payout">Payout: ₹0</span>
      </div>
    </div>
    <div className="bet-card">
      <div className="bet-header">
        <span className="bet-id">ID: SK20230610</span>
        <span className="bet-date">10/06/2023 14:29:56</span>
      </div>
      <div className="bet-market">RAJDHANI NIGHT</div>
      <div className="bet-numbers">
        <div className="bet-number-chip">50 (₹3000)</div>
      </div>
      <div className="bet-footer">
        <span className="bet-status bet-status-won">Won</span>
        <span className="bet-bet-amount">Total: ₹3000</span>
        <span className="bet-payout">Payout: ₹9000</span>
      </div>
    </div>
    <a href="#" className="bet-back-btn">
      <i className="fas fa-arrow-left" /> Back to Dashboard
    </a>
  </div>
</>

  
  )
}

export default MyBet
