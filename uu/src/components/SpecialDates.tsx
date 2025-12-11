import { useEffect, useState } from "react";
import { Calendar, Gift, Heart, PartyPopper, Star } from "lucide-react";

interface UpcomingDate {
  name: string;
  date: Date;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SpecialDates = () => {
  const [upcomingDates, setUpcomingDates] = useState<(UpcomingDate & { daysUntil: number })[]>([]);

  useEffect(() => {
    const calculateUpcoming = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const nextYear = currentYear + 1;

      const specialDates: UpcomingDate[] = [
        { 
          name: "100 Days Together", 
          date: new Date(2025, 11, 25), // Dec 25, 2025
          icon: PartyPopper,
          color: "text-coral"
        },
        { 
          name: "6 Month Anniversary", 
          date: new Date(2026, 2, 16), // March 16, 2026
          icon: Heart,
          color: "text-primary"
        },
        { 
          name: "1 Year Anniversary", 
          date: new Date(2026, 8, 16), // Sept 16, 2026
          icon: Star,
          color: "text-gold"
        },
        { 
          name: "Valentine's Day 2026", 
          date: new Date(2026, 1, 14), // Feb 14, 2026
          icon: Gift,
          color: "text-primary"
        },
      ];

      const withDays = specialDates
        .map(event => {
          const diff = event.date.getTime() - now.getTime();
          const daysUntil = Math.ceil(diff / (1000 * 60 * 60 * 24));
          return { ...event, daysUntil };
        })
        .filter(event => event.daysUntil > 0)
        .sort((a, b) => a.daysUntil - b.daysUntil)
        .slice(0, 4);

      setUpcomingDates(withDays);
    };

    calculateUpcoming();
    const interval = setInterval(calculateUpcoming, 1000 * 60 * 60); // Update hourly
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-coral" />
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Upcoming <span className="text-gradient italic">Special Dates</span>
            </h2>
          </div>
          <p className="text-muted-foreground">Counting down to our next celebrations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingDates.map((event, index) => (
            <div
              key={index}
              className="card-romantic rounded-2xl p-6 text-center animate-fade-in hover:glow-effect transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <event.icon className={`w-10 h-10 mx-auto mb-4 ${event.color}`} />
              <h3 className="font-display font-semibold text-foreground mb-2">
                {event.name}
              </h3>
              <div className="text-3xl font-display font-bold text-gradient mb-1">
                {event.daysUntil}
              </div>
              <p className="text-sm text-muted-foreground">days to go</p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                {event.date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDates;
