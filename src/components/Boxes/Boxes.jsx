import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCoins, faDice, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Boxes.css';

const Satta = () => {
  useEffect(() => {
    // Animation effects
    const boxes = document.querySelectorAll('.satta-box');
    boxes.forEach(box => {
      box.style.animation = 'glow 2s infinite';
    });
  }, []);

  return (
    <div className="satta-container">
      <div className="live-results">
        <div className="result-header">LIVE RESULTS</div>
        <marquee className="result-ticker">
          DESAWAR: 234 || GALI: 456 || FARIDABAD: 789 || GHAZIABAD: 567
        </marquee>
      </div>

      <div className="satta-grid">
        <div className="game-box">
          <div className="game-time">10:00 AM</div>
          <div className="game-name">DESAWAR</div>
          <div className="game-result">234</div>
          <Link to="/numbers" className="play-btn">PLAY NOW</Link>
        </div>

        <div className="game-box">
          <div className="game-time">2:00 PM</div>
          <div className="game-name">GALI</div>
          <div className="game-result">456</div>
          <Link to="/numbers" className="play-btn">PLAY NOW</Link>
        </div>

        <div className="game-box">
          <div className="game-time">5:00 PM</div>
          <div className="game-name">FARIDABAD</div>
          <div className="game-result">789</div>
          <Link to="/numbers" className="play-btn">PLAY NOW</Link>
        </div>

        <div className="game-box">
          <div className="game-time">8:00 PM</div>
          <div className="game-name">GHAZIABAD</div>
          <div className="game-result">567</div>
          <Link to="/numbers" className="play-btn">PLAY NOW</Link>
        </div>
      </div>

      <div className="game-chart">
        <h3>TODAY'S CHART</h3>
        <table>
          <thead>
            <tr>
              <th>Game</th>
              <th>Old</th>
              <th>New</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DESAWAR</td>
              <td>234</td>
              <td>***</td>
              <td>10:00 AM</td>
            </tr>
            <tr>
              <td>GALI</td>
              <td>456</td>
              <td>***</td>
              <td>2:00 PM</td>
            </tr>
            <tr>
              <td>FARIDABAD</td>
              <td>789</td>
              <td>***</td>
              <td>5:00 PM</td>
            </tr>
            <tr>
              <td>GHAZIABAD</td>
              <td>567</td>
              <td>***</td>
              <td>8:00 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Satta;