
import React, { useEffect } from 'react';
import './GameAnimations.css';

const GameAnimations = () => {
  useEffect(() => {
    const createGameElements = () => {
      const container = document.body;
      const elements = 25;
      
      for (let i = 0; i < elements; i++) {
        // Create dice with varied sizes
        const dice = document.createElement('div');
        dice.className = 'dice';
        dice.style.left = `${Math.random() * 100}vw`;
        dice.style.animationDelay = `${Math.random() * 5}s`;
        dice.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
        container.appendChild(dice);

        // Create cards with different rotations
        const card = document.createElement('div');
        card.className = 'card';
        card.style.left = `${Math.random() * 100}vw`;
        card.style.animationDelay = `${Math.random() * 5}s`;
        card.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(card);

        // Create chips with varied colors
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.style.left = `${Math.random() * 100}vw`;
        chip.style.animationDelay = `${Math.random() * 5}s`;
        chip.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        container.appendChild(chip);
      }
    };

    createGameElements();
    return () => {
      const elements = document.querySelectorAll('.dice, .card, .chip');
      elements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default GameAnimations;
