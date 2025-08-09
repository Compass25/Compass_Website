
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  start = 0,
  end, 
  duration = 1200, 
  delay = 0,
  suffix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Smooth easing using ease-out-cubic for natural deceleration
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = start + (easeOutCubic * (end - start));
        
        // Handle decimal numbers with proper rounding
        if ((end - start) % 1 !== 0) {
          setCount(Math.round(currentValue * 10) / 10);
        } else {
          setCount(Math.round(currentValue));
        }

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setCount(end); // Ensure exact final value
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
        setIsAnimating(false);
      };
    }, delay);

    return () => {
      clearTimeout(timer);
      setIsAnimating(false);
    };
  }, [start, end, duration, delay]);

  return (
    <span 
      className={`${className} transition-all duration-75 ease-out`}
      style={{
        fontVariantNumeric: 'tabular-nums'
      }}
    >
      {count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
