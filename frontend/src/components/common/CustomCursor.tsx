import React, { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 22;
const DOT_COLORS = [
  'rgba(6, 182, 212, 1)',
  'rgba(6, 182, 212, 0.9)',
  'rgba(34, 211, 238, 0.75)',
  'rgba(56, 189, 248, 0.6)',
  'rgba(99, 102, 241, 0.5)',
  'rgba(139, 92, 246, 0.4)',
  'rgba(139, 92, 246, 0.25)',
  'rgba(168, 85, 247, 0.15)',
  'rgba(192, 132, 252, 0.1)',
  'rgba(192, 132, 252, 0.05)',
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: -300, y: -300 });
  const animFrameRef = useRef<number>(0);
  const cursorX = useRef(-300);
  const cursorY = useRef(-300);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y });
      if (trailRef.current.length > TRAIL_LENGTH) {
        trailRef.current.shift();
      }

      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const t = i / trail.length;
        const colorIdx = Math.min(Math.floor(t * DOT_COLORS.length), DOT_COLORS.length - 1);
        const radius = lerp(1, 5.5, t);

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = DOT_COLORS[colorIdx];
        ctx.globalAlpha = lerp(0, 1, t);
        ctx.shadowBlur = lerp(0, 18, t);
        ctx.shadowColor = 'rgba(6, 182, 212, 0.9)';
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Lazy ring follows mouse
      cursorX.current = lerp(cursorX.current, mouseRef.current.x, 0.13);
      cursorY.current = lerp(cursorY.current, mouseRef.current.y, 0.13);

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate(${cursorX.current - 20}px, ${cursorY.current - 20}px)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);

    const onMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === 'A' || t.tagName === 'BUTTON' || t.tagName === 'SELECT' ||
        !!t.closest('a') || !!t.closest('button')
      );
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Canvas layer — trailing dots */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Lagging outer ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? 46 : 40,
          height: isHovering ? 46 : 40,
          borderRadius: '50%',
          border: isHovering
            ? '2px solid rgba(139, 92, 246, 0.9)'
            : '1.5px solid rgba(6, 182, 212, 0.75)',
          boxShadow: isHovering
            ? '0 0 18px rgba(139,92,246,0.55), inset 0 0 8px rgba(139,92,246,0.2)'
            : '0 0 14px rgba(6,182,212,0.5)',
          backgroundColor: isClicking
            ? 'rgba(6,182,212,0.09)'
            : isHovering
            ? 'rgba(139,92,246,0.06)'
            : 'transparent',
          transform: `scale(${isClicking ? 0.8 : 1})`,
          transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, transform 0.1s ease, box-shadow 0.18s ease, background-color 0.18s ease',
        }}
      />

      {/* Precise center dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'rgba(139,92,246,1)' : 'rgba(6,182,212,1)',
          boxShadow: isHovering
            ? '0 0 10px 2px rgba(139,92,246,0.9)'
            : '0 0 8px 2px rgba(6,182,212,0.9)',
          transition: 'background-color 0.15s, box-shadow 0.15s',
        }}
      />
    </>
  );
};
