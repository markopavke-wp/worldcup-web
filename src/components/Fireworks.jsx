import { useEffect, useRef } from 'react';

const COLORS = ['#f5c542', '#00c896', '#ffe08a', '#ff6b6b', '#6bb3ff', '#ffffff'];

function random(min, max) {
  return min + Math.random() * (max - min);
}

function createBurst(x, y) {
  const count = 48 + Math.floor(Math.random() * 24);
  const particles = [];
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + random(-0.1, 0.1);
    const speed = random(1.5, 5.5);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: random(0.012, 0.025),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: random(1.5, 3.2),
    });
  }
  return particles;
}

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let frameId = 0;
    let spawnTimer = 0;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = () => {
      const x = random(canvas.width * 0.15, canvas.width * 0.85);
      const y = random(canvas.height * 0.12, canvas.height * 0.45);
      particles = particles.concat(createBurst(x, y));
    };

    spawn();
    spawn();

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnTimer += 1;
      if (spawnTimer % 45 === 0) spawn();

      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.99;
        p.life -= p.decay;

        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="celebration-fireworks" aria-hidden="true" />;
}
