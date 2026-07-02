import { Component } from 'valen';

let initiateConfetti,
    animateConfetti;
    
const Confetti = Component(function Confetti() {
  return {
    template() {
      return (`
        <canvas id="confettiCanvas"></canvas>
    `)
    },
    
    created() {
      let ctx = {},
        canvas = {},
        pieces = [],
        active = false;
      
      initiateConfetti = function() {
        // --- Confetti Effect ---
        canvas = document.getElementById('confettiCanvas');
        
        ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        pieces = [];
        for (let i = 0; i < 150; i++) {
          pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 8 + 3,
            h: Math.random() * 5 + 2,
            color: ['#FFD700', '#FFE44D', '#FFF3B0', '#FF6B35', '#FFFFFF'][Math.floor(Math.random() * 5)],
            speed: Math.random() * 4 + 2,
            drift: (Math.random() - 0.5) * 2
          });
        }
      }
      
      
      animateConfetti = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        active = false;
        pieces.forEach(p => {
          p.y += p.speed;
          p.x += p.drift;
          if (p.y < canvas.height + 50) active = true;
          if (p.y > canvas.height + 50) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
          }
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.w, p.h);
        });
        if (active) requestAnimationFrame(animateConfetti);
      }
    },
    
    run() {
      initiateConfetti()
     // animateConfetti()
    },
    
    stylesheet: {
      canvas: `
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 1;
        `
    }
  }
})

export { Confetti, animateConfetti };