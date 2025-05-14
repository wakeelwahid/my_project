import React from 'react';
import './MyProfile.css'
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  return (
    <div>
      <div id="floatingCoins"></div>

      {/* Profile Header */}
      <header className="profile-header">
        <h1 className="profile-title">MY PROFILE</h1>
        <p className="profile-subtitle">Track your progress and earnings</p>
      </header>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Personal Info Section */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-user"></i> Personal Information
          </h2>
          <div className="user-info">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="user-avatar"
            />
            <div className="user-details">
              <div className="user-name">RAHUL KING</div>
              <div className="user-id">ID: SK789456123</div>
              <div className="detail-row">
                <div className="detail-label">Phone:</div>
                <div className="detail-value">+91 9876543210</div>
              </div>
              <div className="detail-row">
                <div className="detail-label">Email:</div>
                <div className="detail-value">king.rahul@sattaking.com</div>
              </div>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-label">KYC Status:</div>
            <div className="detail-value">
              <span className="kyc-status">VERIFIED</span>
              <button className="edit-button">
                <i className="fas fa-edit"></i> Edit
              </button>
            </div>
            <Link to="/verification" className="kyc-button">
              <i className="fas fa-id-card"></i> Complete KYC
            </Link>
          </div>
        </div>

        {/* Referral Section */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-gift"></i> Referral Earnings
          </h2>
          <div className="referral-stats">
            <div className="stat-card">
              <div className="stat-value">₹12,450</div>
              <div className="stat-label">Total Earnings</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">24</div>
              <div className="stat-label">Total Referrals</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">18</div>
              <div className="stat-label">Active Referrals</div>
            </div>
          </div>
          <div className="referral-code">
            <div>
              <div className="code-label">Your Referral Code:</div>
              <div className="code-text">RAHULKING</div>
            </div>
            <button className="copy-btn">
              <i className="fas fa-copy"></i> COPY CODE
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button className="logout-btn">
        <i className="fas fa-sign-out-alt"></i> LOGOUT
      </button>
    </div>
  );
};

export default ProfilePage;
