import React, { useState } from "react";
import "./WithdrawChips.css";
import { useNavigate } from "react-router-dom";

const WithdrawChips = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Bank Transfer");
  const [account, setAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(amount) < 500) {
      setError("Minimum withdrawal amount is ₹500.");
      return;
    }

    if (!account) {
      setError("Please enter your UPI ID or Account Number.");
      return;
    }

    if (method === "Bank Transfer" && !ifsc) {
      setError("Please enter IFSC code.");
      return;
    }

    navigate("/withdrawalchipssuccess", {
      state: {
        amount,
        method,
        account,
        ifsc,
      },
    });
  };

  return (
    <>
      <div className="withdraw-container">
        <header className="withdraw-header">
          <h1 className="withdraw-title">WITHDRAW CHIPS</h1>
          <div className="gold-line" />
        </header>
        <div className="withdraw-card">
          <h2 className="card-title">Withdraw Chips to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter amount"
                required
                min={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="amount-buttons">
              {[100, 500, 1000, 2000, 5000, 10000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className="amount-btn"
                  onClick={() => setAmount(amt)}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">Withdrawal Method</label>
              <div className="method-grid">
                {["Bank Transfer", "UPI"].map((m) => (
                  <div
                    key={m}
                    className={`method-option ${method === m ? "selected" : ""}`}
                    onClick={() => setMethod(m)}
                  >
                    <span className="method-icon">{m === "UPI" ? "💲" : "🏦"}</span>
                    {m}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                {method === "UPI" ? "UPI ID" : "Account Number"}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={method === "UPI" ? "Enter your UPI ID" : "Account Number"}
                required
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
            {method === "Bank Transfer" && (
              <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Bank IFSC Code"
                  required
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                />
              </div>
            )}
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="submit-btn">
              REQUEST WITHDRAWAL
            </button>
          </form>
        </div>
        <div className="withdrawal-info">
          <h3>ℹ️ Withdrawal Information:</h3>
          <ul>
            <li>Minimum withdrawal: ₹500</li>
            <li>Processing time: 2–4 hours</li>
            <li>Daily limit: ₹50,000</li>
            <li>Bank charges may apply</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WithdrawChips;
