import React, { useEffect } from 'react';
import gsap from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCoins, faGem, faDice, faTrophy, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './Boxes.css'; // Your CSS file with styles
import { Link } from 'react-router-dom';

const Satta = () => {
  useEffect(() => {
    // Initialize animations when page loads
    const createBgParticles = () => {
      const container = document.getElementById('bgAnimation');
      const particleCount = 20; // Reduced for performance
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('bg-particle');
        
        // Random properties
        const size = Math.random() * 8 + 3; // Smaller particles
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 15; // Faster animation
        const opacity = Math.random() * 0.1 + 0.05;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;
        
        container.appendChild(particle);
      }
    };

    const createCoins = () => {
      const container = document.getElementById('floatingCoins');
      const coinCount = 8; // Reduced for performance
      const coins = ['\uf155', '\uf51e', '\uf51d', '\uf0d6', '\uf3ff'];
      
      for (let i = 0; i < coinCount; i++) {
        const coin = document.createElement('i');
        coin.className = 'coin fas';
        coin.innerHTML = coins[Math.floor(Math.random() * coins.length)];
        
        // Random properties
        const size = Math.random() * 20 + 15; // Smaller coins
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;
        
        coin.style.fontSize = `${size}px`;
        coin.style.left = `${left}%`;
        coin.style.animationDelay = `${delay}s`;
        coin.style.animationDuration = `${duration}s`;
        
        container.appendChild(coin);
      }
    };

    createBgParticles();
    createCoins();

    // Animate boxes with GSAP
    const boxes = document.querySelectorAll('.satta-box');
    
    gsap.to(boxes, {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2, // Faster animation
      stagger: 0.15,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.5,
    });

    const animateBoxContent = (box) => {
      gsap.to(box.querySelector('.satta-content'), {
        y: 0,
        z: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
      });

      gsap.to(box.querySelector('.satta-icon'), {
        scale: 1.1,
        rotateY: 0,
        rotateZ: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.to(box.querySelector('.satta-title'), {
        x: 0,
        rotateY: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      });

      gsap.to(box.querySelector('.satta-number'), {
        scale: 1.05,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(1.7)',
      });

      gsap.to(box.querySelector('.satta-btn'), {
        y: 0,
        z: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Shine effect
      gsap.fromTo(
        box,
        { '--shine-pos': '-50%' },
        { '--shine-pos': '150%', duration: 1.5, ease: 'power2.inOut' }
      );
    };

    boxes.forEach((box) => {
      box.addEventListener('mouseenter', () => animateBoxContent(box));
      box.addEventListener('touchstart', () => animateBoxContent(box));

      gsap.to(box, {
        y: -10,
        z: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });
    });
  }, []);

  return (
    <div>
       
      <div className="bg-animation" id="bgAnimation" />
      <div className="floating-coins" id="floatingCoins" />
      <div className="satta-container">
        <div className="satta-row">
          {/* Box 1 */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-1"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faCrown} />
                </div>
                <h4 className="satta-title">GOLDEN KING</h4>
                <div className="satta-number">123-456</div>
                <Link to="/numbers" className="satta-btn">
                  PLAY
                </Link>
              </div>
            </div>
          </div>
          
          {/* Box 2 */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-2"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faCoins} />
                </div>
                <h4 className="satta-title">DIAMOND KING</h4>
                <div className="satta-number">789-012</div>
                <a href="#" className="satta-btn">
                  PLAY
                </a>
              </div>
            </div>
          </div>
          
          {/* Box 3 */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-3"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1507914464562-6ff4f296f158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faGem} />
                </div>
                <h4 className="satta-title">SILVER KING</h4>
                <div className="satta-number">345-678</div>
                <a href="#" className="satta-btn">
                  PLAY
                </a>
              </div>
            </div>
          </div>
          
          {/* Box 4 */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-4"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faDice} />
                </div>
                <h4 className="satta-title">LUCKY KING</h4>
                <div className="satta-number">901-234</div>
                <a href="#" className="satta-btn">
                  PLAY
                </a>
              </div>
            </div>
          </div>
          
          {/* Box 5 */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-5"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faTrophy} />
                </div>
                <h4 className="satta-title">PLATINUM KING</h4>
                <div className="satta-number">567-890</div>
                <a href="#" className="satta-btn">
                  PLAY
                </a>
              </div>
            </div>
          </div>
          
          {/* New Upcoming Box */}
          <div className="satta-box-wrapper">
            <div
              className="satta-box box-upcoming"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")',
              }}
            >
              <div className="satta-content">
                <div className="satta-icon">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <h4 className="satta-title">UPCOMING</h4>
                <div className="satta-number">COMING SOON</div>
                <a href="#" className="satta-btn">
                  NOTIFY ME
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Satta;