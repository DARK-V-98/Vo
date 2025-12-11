import { Heart } from "lucide-react";
import DaysCounter from "./DaysCounter";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Names */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground">
            Vishu
          </h1>
          <Heart className="w-10 h-10 md:w-14 md:h-14 text-primary fill-primary animate-heart-beat" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold italic text-gradient">
            Oshi
          </h1>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground font-medium">
          A love story written in the stars
        </p>
      </div>

      {/* Days Counter - Now with fixed date */}
      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <DaysCounter />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <Heart className="w-8 h-8 text-primary fill-primary" />
      </div>
      <div className="absolute top-40 right-16 animate-float-delayed opacity-20">
        <Heart className="w-12 h-12 text-coral fill-coral" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float opacity-25">
        <Heart className="w-6 h-6 text-gold fill-gold" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float-delayed opacity-30">
        <Heart className="w-10 h-10 text-primary fill-primary" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <Heart className="w-5 h-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
