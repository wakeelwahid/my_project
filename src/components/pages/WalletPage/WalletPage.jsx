import React from 'react';
import './WalletPage.css'
import { Link } from 'react-router-dom';

const WalletPage = () => {
  return (
    <div>
      <div id="floatingCoins"></div>

      {/* Wallet Header */}
      <header className="wallet-header">
        <h1 className="wallet-title">MY WALLET</h1>
      </header>

      {/* KYC Button */}
      <div className="kyc-btn-container">
        <Link to="/verification" className="kyc-button">
          <i className="fas fa-id-card"></i> COMPLETE KYC
        </Link>
      </div>

      {/* Wallet Card */}
      <div className="wallet-card">
        {/* Balance Section */}
        <div className="balance-section">
          <div className="balance-label">TOTAL BALANCE</div>
          <div className="total-balance">₹25,750.00</div>
          <div className="balance-subtext">Total amount</div>
        </div>

        {/* Amount Cards */}
        <div className="amount-cards">
          <div className="amount-card deposit-amount">
            <div className="amount-label">WINNINGS AMOUNT</div>
            <div className="amount-value">₹15,000.00</div>
            <div className="amount-subtext"> Available for withdrawal</div>
          </div>

          <div className="amount-card winnings-amount">
            <div className="amount-label">BONUS AMOUNT</div>
            <div className="amount-value">₹10,750.00</div>
            <div className="amount-subtext">Total bonus</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/addchips" className="action-btn deposit-btn">
            <i className="fas fa-rupee-sign"></i> ADD CASH
          </Link>

          <Link to="/withdrawchips" className="action-btn withdraw-btn">
            <i className="fas fa-wallet"></i> WITHDRAW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
