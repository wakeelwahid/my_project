import React from "react";
import './Refers.css'

const Refers = () => {
  return (
    <>
      <div id="floatingCoins" />
      {/* Referral Header */}
      <header className="refer-header">
        <h1 className="refer-title">REFER &amp; EARN</h1>
        <p className="refer-subtitle">
          Invite your friends and earn ₹50 for each successful referral plus 2%
          lifetime commission on their winnings!
        </p>
      </header>
      {/* Referral Card */}
      <div className="referral-card">
        {/* Benefits Section */}
        <div className="benefits-section">
          <h2 className="benefits-title">Why Refer Friends?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-rupee-sign" />
              </div>
              <h3 className="benefit-title">Instant ₹50 Bonus</h3>
              <p className="benefit-desc">
                Get ₹50 immediately when your friend signs up using your
                referral code and make their first deposit
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-percentage" />
              </div>
              <h3 className="benefit-title">2% Lifetime Commission</h3>
              <p className="benefit-desc">
                Earn 2% of whatever your referral wins, for their entire
                lifetime
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <i className="fas fa-gift" />
              </div>
              <h3 className="benefit-title">No Limits</h3>
              <p className="benefit-desc">
                Refer unlimited friends and earn unlimited commission
              </p>
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">18</div>
              <div className="stat-label">Total Referrals</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹900</div>
              <div className="stat-label">Direct Bonus Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹2,450</div>
              <div className="stat-label">Commission Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">₹3,350</div>
              <div className="stat-label">Total Earnings</div>
            </div>
          </div>
        </div>
        {/* Referral Code Section */}
        <div className="code-section">
          <h3 className="code-title">Your Unique Referral Code</h3>
          <div className="referral-code-box">
            <div className="code-label">Share this code with your friends</div>
            <div className="code-text">RAHULKING</div>
          </div>
          <div className="share-buttons">
            <button className="share-btn copy-btn">
              <i className="fas fa-copy" /> COPY CODE
            </button>
            <button className="share-btn whatsapp-btn">
              <i className="fab fa-whatsapp" /> SHARE ON WHATSAPP
            </button>
            <button className="share-btn telegram-btn">
              <i className="fab fa-telegram" /> SHARE ON TELEGRAM
            </button>
          </div>
        </div>
        {/* How It Works */}
        <div className="how-it-works">
          <h2 className="benefits-title" style={{ textAlign: "center" }}>
            How It Works
          </h2>
          <div className="steps">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Share Your Code</h3>
              <p className="step-desc">
                Share your unique referral code with friends via WhatsApp,
                Telegram, SMS or any other method
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Friend Registers</h3>
              <p className="step-desc">
                Your friend registers using your code and makes their first
                deposit
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Start Earning</h3>
              <p className="step-desc">
                You instantly get ₹50 and 2% lifetime commission on their
                winnings
              </p>
            </div>
          </div>
        </div>
        {/* Commission Structure */}
        <div className="commission-section">
          <h2 className="benefits-title">Commission Structure</h2>
          <div className="commission-cards">
            <div className="commission-card">
              <div className="commission-amount">₹50</div>
              <p className="commission-desc">
                Instant bonus for each successful referral
              </p>
            </div>
            <div className="commission-card">
              <div className="commission-amount">2%</div>
              <p className="commission-desc">
                Lifetime commission on your referral's winnings
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refers;
