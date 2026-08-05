import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
         target.tagName === 'A' ||
         target.closest('button') ||
         target.closest('a') ||
         target.getAttribute('role') === 'button' ||
         target.classList.contains('interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      {/* Outer Glowing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/60 pointer-events-none z-50 mix-blend-screen shadow-[0_0_15px_rgba(6,182,212,0.6)] hidden md:block"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? '#38BDF8' : 'rgba(6,182,212,0.6)',
          backgroundColor: isHovered ? 'rgba(6,182,212,0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
      />
      {/* Core Glowing Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-50 shadow-[0_0_10px_#06B6D4] hidden md:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 800, mass: 0.01 }}
      />
    </>
  );
};
