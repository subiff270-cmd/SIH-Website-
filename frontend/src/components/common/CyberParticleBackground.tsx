import React, { useEffect, useRef } from 'react';

interface CivicParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: string;
  label: string;
  size: number;
  color: string;
}

export const CyberParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth || 1200);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1200;
      height = canvas.height = window.innerHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    const civicItems = [
      { icon: '🍾', label: 'Plastic Bottle', color: '#06B6D4' },
      { icon: '🗑️', label: 'Overflowing Waste', color: '#A855F7' },
      { icon: '💧', label: 'Water Leak', color: '#3B82F6' },
      { icon: '🛣️', label: 'Road Pothole', color: '#F59E0B' },
      { icon: '⚡', label: 'Broken Lamp', color: '#EC4899' },
      { icon: '🕳️', label: 'Open Manhole', color: '#10B981' }
    ];

    const particles: CivicParticle[] = Array.from({ length: 40 }, (_, i) => {
      const item = civicItems[i % civicItems.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        icon: item.icon,
        label: item.label,
        size: Math.random() * 6 + 18,
        color: item.color
      };
    });

    const render = () => {
      try {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.x += p1.vx;
          p1.y += p1.vy;

          if (p1.x < -30) p1.x = width + 30;
          if (p1.x > width + 30) p1.x = -30;
          if (p1.y < -30) p1.y = height + 30;
          if (p1.y > height + 30) p1.y = -30;

          ctx.font = `${p1.size}px sans-serif`;
          ctx.fillText(p1.icon, p1.x, p1.y);

          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = p1.color;
          ctx.fillText(p1.label, p1.x + p1.size + 4, p1.y - 2);

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {
              ctx.beginPath();
              ctx.moveTo(p1.x + 10, p1.y - 10);
              ctx.lineTo(p2.x + 10, p2.y - 10);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * (1 - dist / 160)})`;
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }
        }
      } catch (err) {
        // Safe fail
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
