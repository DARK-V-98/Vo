import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary fill-primary animate-pulse-soft" />
          <span className="font-display text-xl text-foreground">Vishu & Oshi</span>
          <Heart className="w-5 h-5 text-primary fill-primary animate-pulse-soft" />
        </div>
        <p className="text-muted-foreground text-sm">
          Made with endless love • Forever and always
        </p>
        <p className="text-muted-foreground/60 text-xs mt-4">
          Our love story continues...
        </p>
      </div>
    </footer>
  );
};

export default Footer;
