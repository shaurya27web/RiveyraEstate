import { useState, useEffect } from 'react';

const useCounter = (end, duration = 3000, start = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime = null;
    let animationFrame = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, start]);

  return count;
};

export default useCounter;