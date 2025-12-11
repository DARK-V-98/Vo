import { useEffect, useState } from "react";
import { Heart, Sunrise } from "lucide-react";

const affirmations = [
  "Today, I choose to love you even more than yesterday.",
  "You are my greatest adventure and sweetest comfort.",
  "Every moment with you is a gift I treasure.",
  "My love for you grows stronger with each passing day.",
  "You make my heart smile in ways I never knew possible.",
  "Being with you feels like coming home.",
  "You are the answer to every prayer my heart has ever made.",
  "I am so grateful the universe brought us together.",
  "Your love is my favorite feeling in the world.",
  "Together, we are unstoppable.",
  "You are my person, my partner, my everything.",
  "Loving you is the easiest and best thing I've ever done.",
  "You are worth every moment of waiting.",
  "My heart knew you before my eyes ever did.",
  "With you, even ordinary moments feel magical.",
];

const DailyAffirmation = () => {
  const [affirmation, setAffirmation] = useState("");
  const [dayOfYear, setDayOfYear] = useState(0);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    
    setDayOfYear(day);
    setAffirmation(affirmations[day % affirmations.length]);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card-romantic rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-coral/20 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/20 to-transparent rounded-tr-full" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sunrise className="w-6 h-6 text-gold" />
              <h2 className="text-xl font-display font-semibold text-foreground">
                Today's Love Affirmation
              </h2>
            </div>

            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-primary fill-primary animate-pulse-soft" />
            </div>

            <p className="text-2xl md:text-3xl font-display italic text-foreground leading-relaxed">
              "{affirmation}"
            </p>

            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Day {dayOfYear} of the year • New affirmation every day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyAffirmation;
