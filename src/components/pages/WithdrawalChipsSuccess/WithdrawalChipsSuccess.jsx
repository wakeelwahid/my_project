import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faWallet,
  faHome,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import "./WithdrawalChipsSuccess.css";

const WithdrawalChipsSuccess = () => {
  const { state } = useLocation();
  const {
    transactionId = "TXN000000",
    amount = "0.00",
    method = "UPI",
    account = "-",
    ifsc = "-",
    status = "Pending",
  } = state || {};

  return (
    <div className="withdrawal-success-page">
      <div className="success-container">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>

        <h1 className="success-title">Withdrawal Submitted!</h1>

        <div className="success-details">
          <div className="detail-item">
            <span className="detail-label">Transaction ID:</span>
            <span className="detail-value">{transactionId}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">₹{amount}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              {method === "UPI" ? "UPI ID" : "Bank Account"}:
            </span>
            <span className="detail-value">{account}</span>
          </div>

          {method === "Bank Transfer" && (
            <div className="detail-item">
              <span className="detail-label">IFSC:</span>
              <span className="detail-value">{ifsc}</span>
            </div>
          )}

          <div className="detail-item">
            <span className="detail-label">Status:</span>
            <span className="detail-value success">{status}</span>
          </div>
        </div>

        <div className="success-message">
          <FontAwesomeIcon icon={faWallet} className="message-icon" />
          <p>
            Your withdrawal request has been submitted. It will be credited to
            your {method === "UPI" ? "UPI ID" : "bank account"} after admin approval.
          </p>
        </div>

        <div className="success-buttons">
          <Link to="/" className="success-btn home-btn">
            <FontAwesomeIcon icon={faHome} /> Back to Home
          </Link>
          <Link to="/transactions" className="success-btn history-btn">
            <FontAwesomeIcon icon={faHistory} /> View Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalChipsSuccess;
