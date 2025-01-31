import React, { useEffect, useRef, useState } from 'react';

function Balloons() {
  const balloonEmojis = ['🎈', '🎉', '🎊', '💫', '🥳', '🎀', '🎁', '✨', '🌟'];
  const balloonColors = ['#FF69B4', '#FF6347', '#32CD32', '#1E90FF', '#FFD700', '#8A2BE2', '#FF4500', '#F0E68C'];
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    generateBalloons();

    // Resize canvas when the window resizes
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    // Controlled explosion interval (every 1 second instead of 100ms)
    const explosionInterval = setInterval(generateFullExplosion, 1000);

    return () => {
      clearInterval(explosionInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateBalloons = () => {
    const balloonContainer = document.getElementById('balloon-container');
    if (!balloonContainer) return;

    balloonContainer.innerHTML = ''; // Clear existing balloons
    for (let i = 0; i < 30; i++) {  // Reduced balloon count for better performance
      const balloon = document.createElement('div');
      balloon.classList.add('text-xl', 'absolute', 'cursor-pointer');
      balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.top = `${Math.random() * 100}%`;
      balloon.style.fontSize = `${Math.random() * 20 + 15}px`;
      balloon.style.color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      balloon.style.animation = `float ${40 + Math.random() * 10}s linear infinite`;
      balloon.addEventListener('click', () => handleBalloonClick(balloon));
      balloonContainer.appendChild(balloon);
    }
  };

  const handleBalloonClick = (balloon) => {
    if (!balloon) return;
    const { left, top, width, height } = balloon.getBoundingClientRect();
    createExplosion(left + width / 2, top + height / 2);
    balloon.remove();
  };

  const createExplosion = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];

    for (let i = 0; i < 12; i++) {
      particles.push({
        x,
        y,
        radius: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: (Math.random() - 0.5) * 8,
        life: 15,
      });
    }

    const animateExplosion = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          p.x += p.velocityX;
          p.y += p.velocityY;
          p.life--;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.closePath();
        }
      });

      if (particles.length > 0) requestAnimationFrame(animateExplosion);
    };

    animateExplosion();
  };

  const generateFullExplosion = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createExplosion(x, y);
  };

  return (
    <>
      <div
        id="balloon-container"
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-10"
      ></div>
      <canvas
        ref={canvasRef}
        id="particle-canvas"
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-20"
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </>
  );
}

export default Balloons;
