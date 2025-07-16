"use client";

import { useEffect, useRef } from 'react';

interface StarProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
}

export function StarField({ count = 100, minSize = 1, maxSize = 3 }: StarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear any existing stars
    container.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = Math.random() * (maxSize - minSize) + minSize;
      
      // Set star properties
      star.className = 'star';
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Set custom properties for animation
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.setProperty('--delay', `${Math.random() * 5}s`);
      star.style.setProperty('--brightness', `${Math.random() * 0.7 + 0.3}`);
      
      container.appendChild(star);
    }
  }, [count, minSize, maxSize]);
  
  return <div ref={containerRef} className="star-field" />;
}

export function ParallaxEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Apply parallax effect to elements with parallax classes
      document.querySelectorAll('.parallax').forEach((el) => {
        const element = el as HTMLElement;
        const speed = 20;
        const xPos = (x - 0.5) * speed;
        const yPos = (y - 0.5) * speed;
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
      
      document.querySelectorAll('.parallax-slow').forEach((el) => {
        const element = el as HTMLElement;
        const speed = 10;
        const xPos = (x - 0.5) * speed;
        const yPos = (y - 0.5) * speed;
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
      
      document.querySelectorAll('.parallax-slower').forEach((el) => {
        const element = el as HTMLElement;
        const speed = 5;
        const xPos = (x - 0.5) * speed;
        const yPos = (y - 0.5) * speed;
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return null;
}

export default function BackgroundEffects() {
  return (
    <>
      <div className="bg-obsidian"></div>
      <StarField count={150} />
      <ParallaxEffect />
    </>
  );
}
