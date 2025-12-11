import { Heart, Quote } from "lucide-react";

const LoveMessage = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card-romantic rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 opacity-20">
            <Quote className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20 rotate-180">
            <Quote className="w-12 h-12 text-primary" />
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              My Love Letter to <span className="text-gradient italic">Oshi</span>
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80 font-body">
              <p>
                Every moment with you feels like a beautiful dream I never want to wake up from.
                You are my sunshine on cloudy days, my peace in chaos, and my forever happiness.
              </p>
              
              <p>
                These {86} days have been the most magical journey of my life.
                With every passing day, I fall deeper in love with you, discovering new reasons
                to cherish you more.
              </p>
              
              <p>
                Thank you for choosing me, for loving me, and for being the most incredible
                person in my life. You make everything beautiful just by being you.
              </p>
              
              <div className="pt-6 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-primary" />
                <span className="font-display italic text-xl text-primary">Forever Yours, Vishu</span>
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveMessage;
