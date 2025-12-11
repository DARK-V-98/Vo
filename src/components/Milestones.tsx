'use client';
import { Heart, Calendar, Star, Sparkles, Gift, Music } from "lucide-react";

const milestones = [
  {
    icon: Heart,
    title: "Day We Met",
    description: "The day our eyes met and everything changed forever",
    day: "Day 1",
  },
  {
    icon: Star,
    title: "First Date",
    description: "Our first magical date filled with butterflies and smiles",
    day: "Day 7",
  },
  {
    icon: Sparkles,
    title: "Said 'I Love You'",
    description: "Three words that made our hearts beat as one",
    day: "Day 30",
  },
  {
    icon: Gift,
    title: "First Gift",
    description: "A small token of love that meant everything",
    day: "Day 45",
  },
  {
    icon: Music,
    title: "Our Song",
    description: "Found the melody that became ours forever",
    day: "Day 60",
  },
  {
    icon: Calendar,
    title: "86 Days Strong",
    description: "And counting every beautiful moment together",
    day: "Today",
  },
];

const Milestones = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-rose-soft/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Our <span className="text-gradient italic">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Beautiful milestones in our love story
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-coral to-gold hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative md:flex items-center animate-fade-in ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="card-romantic rounded-2xl p-6 inline-block">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                      <milestone.icon className="w-6 h-6 text-primary fill-primary/20" />
                      <span className="text-sm font-semibold text-coral">{milestone.day}</span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary glow-effect" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
