'use client';
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingHeart[] = [];
      for (let i = 0; i < 15; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute heart-fall text-primary"
          style={{
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            fill: "currentColor",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
