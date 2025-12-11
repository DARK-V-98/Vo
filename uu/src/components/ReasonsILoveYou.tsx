import { useState } from "react";
import { Heart, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

const reasons = [
  "Your beautiful smile that lights up my world",
  "The way you laugh at my silly jokes",
  "How you always know how to make me feel better",
  "Your kindness and caring heart",
  "The way you look at me",
  "Your amazing sense of humor",
  "How you support my dreams",
  "The little things you do for me",
  "Your warm hugs that feel like home",
  "The way you say my name",
  "Your patience and understanding",
  "How you make ordinary moments special",
  "Your beautiful eyes that I get lost in",
  "The way you hold my hand",
  "Your strength and determination",
  "How you believe in us",
  "The comfort I feel when I'm with you",
  "Your creative mind and unique perspective",
  "The way you care about others",
  "Simply because you are you ❤️",
];

const ReasonsILoveYou = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedReasons = showAll ? reasons : reasons.slice(0, 6);

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
              Reasons I <span className="text-gradient italic">Love You</span>
            </h2>
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
          <p className="text-muted-foreground text-lg">
            Oshi, here are just a few reasons why my heart belongs to you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedReasons.map((reason, index) => (
            <div
              key={index}
              className="card-romantic rounded-xl p-5 flex items-start gap-4 animate-fade-in hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-soft flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary fill-primary" />
              </div>
              <p className="text-foreground font-medium pt-1">{reason}</p>
            </div>
          ))}
        </div>

        {reasons.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show All {reasons.length} Reasons <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReasonsILoveYou;
