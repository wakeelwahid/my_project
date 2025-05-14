import React from "react";
import "./Transactions.css";

const Transactions = () => {
  return (
    <>
    <div className="transactions-container">
      <div className="transactions-content">
        <header className="transactions-header">
          <h1 className="transactions-title">TRANSACTION HISTORY</h1>
        </header>
        <div className="transaction-card">
          <h2 className="card-title">Your Transactions</h2>
          <div className="table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Type</th>
                  <th>Amount</th>
                  {/* <th>Method</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-06-15 / <span>10:24 AM</span></td>
                  <td>deposit</td>
                  <td className="credit">+₹5000</td>
                  {/* <td>UPI</td> */}
                  <td>completed</td>
                </tr>
                <tr>
                  <td>2023-06-14 / <span>10:24 AM</span></td>
                  <td>withdraw</td>
                  <td className="debit">-₹2000</td>
                  {/* <td>Bank Transfer</td> */}
                  <td>completed</td>
                </tr>
                <tr>
                  <td>2023-06-12 / <span>10:24 AM</span></td>
                  <td>deposit</td>
                  <td className="credit">+₹10000</td>
                  {/* <td>PayTM</td> */}
                  <td>completed</td>
                </tr>
                <tr>
                  <td>2023-06-10 / <span>10:24 AM</span></td>
                  <td>withdraw</td>
                  <td className="debit">-₹5000</td>
                  {/* <td>Bank Transfer</td> */}
                  <td className="status-pending">pending</td>
                </tr>
                <tr>
                  <td>2023-06-08 / <span>10:24 AM</span></td>
                  <td>deposit</td>
                  <td className="credit">+₹2000</td>
                  {/* <td>UPI</td> */}
                  <td>completed</td>
                </tr>
                <tr>
                  <td>2023-06-05 / <span>10:24 AM</span></td>
                  <td>deposit</td>
                  <td className="credit">+₹3000</td>
                  {/* <td>PayTM</td> */}
                  <td>completed</td>
                </tr>
                <tr>
                  <td>2023-06-03 / <span>10:24 AM</span></td>
                  <td>withdraw</td>
                  <td className="debit">-₹1500</td>
                  {/* <td>UPI</td> */}
                  <td>completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Transactions;