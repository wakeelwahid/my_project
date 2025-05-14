import React, { useState, useEffect } from "react";
import "./NumberPage.css";
import { Link } from "react-router-dom";

function NumberPage() {
  const [selectedNumbers, setSelectedNumbers] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [highlightNumbers, setHighlightNumbers] = useState(false);
  const [activeSection, setActiveSection] = useState("all");

  const standardAmounts = [10, 50, 100, 300, 500, 1000];

  // Generate numbers

  const allNumbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const andarNumbers = Array.from({ length: 10 }, (_, i) => i); // 0-9
  const baharNumbers = Array.from({ length: 10 }, (_, i) => i); // 0-9

  const openAmountPopup = (number, section) => {
    setCurrentSelection({ number, section });
    // Get amount for this specific number+section combination
    const key = `${number}-${section}`;
    const existing = selectedNumbers[key];
    setCurrentAmount(existing?.amount || 0);
    setShowPopup(true);
  };

  const closeAmountPopup = () => {
    setShowPopup(false);
    setCurrentSelection(null);
    setCurrentAmount(0);
  };

  const confirmAmount = (amount) => {
    if (currentSelection && amount > 0) {
      const key = `${currentSelection.number}-${currentSelection.section}`;
      setSelectedNumbers((prev) => ({
        ...prev,
        [key]: {
          amount,
          section: currentSelection.section,
          number: currentSelection.number,
        },
      }));
    }
    closeAmountPopup();
  };

  const removeNumber = (key) => {
    const newSelected = { ...selectedNumbers };
    delete newSelected[key];
    setSelectedNumbers(newSelected);
  };

  const clearAll = () => {
    setSelectedNumbers({});
    setHighlightNumbers(false);
  };

  const placeBet = () => {
    const totalNumbers = Object.keys(selectedNumbers).length;
    if (totalNumbers === 0) {
      alert("Please select at least one number!");
      return;
    }

    const totalAmount = Object.values(selectedNumbers).reduce(
      (sum, num) => sum + num.amount,
      0,
    );
    const numbersList = Object.entries(selectedNumbers)
      .map(([key, data]) => {
        const sectionMark =
          data.section === "andar" ? "A" : data.section === "bahar" ? "B" : "";
        return `${data.number}${sectionMark} (₹${data.amount})`;
      })
      .join(", ");

    alert(
      `Bet placed on numbers: ${numbersList}\nTotal amount: ₹${totalAmount}`,
    );
    setHighlightNumbers(true);
  };

  const totalAmount = Object.values(selectedNumbers).reduce(
    (sum, num) => sum + num.amount,
    0,
  );

  // Check if a number is selected in specific section
  const isSelected = (number, section) => {
    return !!selectedNumbers[`${number}-${section}`];
  };

  useEffect(() => {
    const addGlowEffect = () => {
      const cells = document.querySelectorAll(".number-cell");
      cells.forEach((cell) => {
        cell.addEventListener("mouseover", () => {
          cell.style.transform = "scale(1.1) translateY(-5px)";
          cell.style.boxShadow = "0 10px 20px rgba(0, 243, 255, 0.4)";
        });
        cell.addEventListener("mouseout", () => {
          cell.style.transform = "scale(1) translateY(0)";
          cell.style.boxShadow = "none";
        });
      });
    };
    addGlowEffect();
  }, []);

  return (
    <div className="num-container">
      <div className="cyber-glitch"></div>
      <h1>SATTA KING NUMBER SELECTION</h1>

      <div className="section-tabs">
        <button
          className={`tab-btn ${activeSection === "all" ? "active" : ""}`}
          onClick={() => setActiveSection("all")}
        >
          All Numbers (1-100)
        </button>
        <button
          className={`tab-btn ${activeSection === "andar" ? "active" : ""}`}
          onClick={() => setActiveSection("andar")}
        >
          Andar (0-9)
        </button>
        <button
          className={`tab-btn ${activeSection === "bahar" ? "active" : ""}`}
          onClick={() => setActiveSection("bahar")}
        >
          Bahar (0-9)
        </button>
      </div>

      {activeSection === "all" && (
        <div className="number-grid">
          {allNumbers.map((number) => (
            <div
              key={number}
              className={`number-cell ${
                isSelected(number, "all") ? "selected" : ""
              } ${
                highlightNumbers && isSelected(number, "all") ? "highlight" : ""
              }`}
              onClick={() => openAmountPopup(number, "all")}
            >
              {number}
            </div>
          ))}
        </div>
      )}

      {activeSection === "andar" && (
        <div className="section-container">
          <h2 className="section-title">Andar Numbers (0-9)</h2>
          <div className="section-number-grid">
            {andarNumbers.map((number) => (
              <div
                key={`andar-${number}`}
                className={`number-cell andar ${
                  isSelected(number, "andar") ? "selected" : ""
                } ${
                  highlightNumbers && isSelected(number, "andar")
                    ? "highlight"
                    : ""
                }`}
                onClick={() => openAmountPopup(number, "andar")}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "bahar" && (
        <div className="section-container">
          <h2 className="section-title">Bahar Numbers (0-9)</h2>
          <div className="section-number-grid">
            {baharNumbers.map((number) => (
              <div
                key={`bahar-${number}`}
                className={`number-cell bahar ${
                  isSelected(number, "bahar") ? "selected" : ""
                } ${
                  highlightNumbers && isSelected(number, "bahar")
                    ? "highlight"
                    : ""
                }`}
                onClick={() => openAmountPopup(number, "bahar")}
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="controls">
        <div className="selected-numbers">
          <h3>Your Selected Numbers:</h3>
          <div className="selected-list">
            {Object.entries(selectedNumbers).map(([key, data]) => (
              <div key={key} className={`selected-item ${data.section}`}>
                {data.number}
                {data.section === "andar" && (
                  <span className="section-mark">A</span>
                )}
                {data.section === "bahar" && (
                  <span className="section-mark">B</span>
                )}
                <span className="amount">₹{data.amount}</span>
                <span className="remove" onClick={() => removeNumber(key)}>
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="control-group">
          <label htmlFor="totalAmount">Total Bet Amount</label>
          <input
            type="text"
            id="totalAmount"
            readOnly
            value={`₹${totalAmount}`}
          />
        </div>

        <Link to="/ordersuccess" className="btn" onClick={placeBet}>
          Place Bet
        </Link>
        <button className="btn btn-danger" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className="summary">
        <h3>BET SUMMARY</h3>
        <div className="summary-item">
          <span>Total Numbers Selected:</span>
          <span>{Object.keys(selectedNumbers).length}</span>
        </div>
        <div className="summary-item">
          <span>Total Bet Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {showPopup && (
        <div className="amount-popup">
          <h3>
            Select Amount for Number <span>{currentSelection?.number}</span>
          </h3>
          <div className="amount-options">
            {standardAmounts.map((amt) => (
              <button
                key={amt}
                className={`amount-btn ${currentAmount === amt ? "active" : ""}`}
                onClick={() => setCurrentAmount(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <div className="custom-amount">
            <input
              type="number"
              value={
                currentAmount && !standardAmounts.includes(currentAmount)
                  ? currentAmount
                  : ""
              }
              onChange={(e) => setCurrentAmount(parseInt(e.target.value) || 0)}
              placeholder="Enter custom amount"
              min="1"
            />
          </div>
          <div className="popup-buttons">
            <button className="popup-btn cancel-btn" onClick={closeAmountPopup}>
              Cancel
            </button>
            <button
              className="popup-btn confirm-btn"
              onClick={() => confirmAmount(currentAmount)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {showPopup && <div className="overlay"></div>}
    </div>
  );
}

export default NumberPage;
