'use client';
import { Heart, Percent, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const LoveCalculator = () => {
  const [score, setScore] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    setHasCalculated(false);
    setScore(0);

    // Animated counting effect
    let current = 0;
    const target = 95 + Math.floor(Math.random() * 5); // Always 95-99%
    const interval = setInterval(() => {
      current += 2;
      if (current >= target) {
        setScore(target);
        setIsCalculating(false);
        setHasCalculated(true);
        clearInterval(interval);
      } else {
        setScore(current);
      }
    }, 30);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="card-romantic rounded-3xl p-8 md:p-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-gold" />
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
              Love Calculator
            </h2>
            <Sparkles className="w-6 h-6 text-gold" />
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-rose-soft flex items-center justify-center mb-2">
                <span className="text-2xl">💙</span>
              </div>
              <p className="font-medium text-foreground">Vishu</p>
            </div>
            
            <Heart className={`w-10 h-10 text-primary fill-primary ${isCalculating ? 'animate-heart-beat' : ''}`} />
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-rose-soft flex items-center justify-center mb-2">
                <span className="text-2xl">💗</span>
              </div>
              <p className="font-medium text-foreground">Oshi</p>
            </div>
          </div>

          {/* Score Display */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * score) / 100}
                className="transition-all duration-300"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--coral))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-bold text-gradient">{score}</span>
              <span className="text-2xl text-muted-foreground">%</span>
            </div>
          </div>

          {hasCalculated && (
            <p className="text-lg font-medium text-foreground mb-6 animate-fade-in">
              {score >= 95 ? "Soulmates! 💕 Made for each other!" : "Perfect Match! ✨"}
            </p>
          )}

          <button
            onClick={calculate}
            disabled={isCalculating}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-coral text-primary-foreground font-semibold hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isCalculating ? "Calculating..." : hasCalculated ? "Calculate Again" : "Calculate Love"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LoveCalculator;
