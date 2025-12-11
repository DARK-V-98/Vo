import { useState, useEffect } from "react";
import { Heart, RefreshCw } from "lucide-react";

const quotes = [
  { text: "You are my today and all of my tomorrows.", author: "Leo Christopher" },
  { text: "I love you not only for what you are, but for what I am when I am with you.", author: "Elizabeth Barrett Browning" },
  { text: "In all the world, there is no heart for me like yours.", author: "Maya Angelou" },
  { text: "You are the source of my joy, the center of my world.", author: "Unknown" },
  { text: "Every love story is beautiful, but ours is my favorite.", author: "Unknown" },
  { text: "I fell in love the way you fall asleep: slowly, and then all at once.", author: "John Green" },
  { text: "You make me want to be a better person.", author: "Unknown" },
  { text: "Meeting you was fate, becoming your friend was a choice, but falling in love with you was beyond my control.", author: "Unknown" },
  { text: "I wish I could turn back the clock. I'd find you sooner and love you longer.", author: "Unknown" },
  { text: "You are my heart, my life, my one and only thought.", author: "Arthur Conan Doyle" },
];

const LoveQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextQuote, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Love Quotes for Us
          </h2>
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>

        <div className="card-romantic rounded-3xl p-8 md:p-12 relative min-h-[200px] flex flex-col items-center justify-center">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <p className="text-xl md:text-2xl font-display italic text-foreground leading-relaxed mb-6">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-muted-foreground">— {quotes[currentQuote].author}</p>
          </div>

          <button
            onClick={nextQuote}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-rose-soft hover:bg-rose-medium/30 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>

          {/* Quote indicators */}
          <div className="flex gap-1.5 mt-6">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuote(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentQuote ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveQuotes;
