
import React, { useEffect } from 'react';
import './GameAnimations.css';

const GameAnimations = () => {
  useEffect(() => {
    const createGameElements = () => {
      const container = document.body;
      const elements = 15;
      
      for (let i = 0; i < elements; i++) {
        // Create dice
        const dice = document.createElement('div');
        dice.className = 'dice';
        dice.style.left = `${Math.random() * 100}vw`;
        dice.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(dice);

        // Create cards
        const card = document.createElement('div');
        card.className = 'card';
        card.style.left = `${Math.random() * 100}vw`;
        card.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(card);

        // Create chips
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.style.left = `${Math.random() * 100}vw`;
        chip.style.animationDelay = `${Math.random() * 10}s`;
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
