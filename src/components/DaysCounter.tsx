'use client';
import { useEffect, useState } from "react";
import { Heart, Calendar, Clock, Sparkles } from "lucide-react";

// YOUR LOVE START DATE - September 16, 2025
const LOVE_START_DATE = new Date(2025, 8, 16); // Month is 0-indexed, so 8 = September

const DaysCounter = () => {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    weeks: 0,
    months: 0,
    totalHours: 0,
    totalMinutes: 0,
    nextMilestone: 0,
    milestoneName: "",
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - LOVE_START_DATE.getTime();
      
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(diff / (1000 * 60 * 60));
      const totalMinutes = Math.floor(diff / (1000 * 60));
      
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const weeks = Math.floor(totalDays / 7);
      const months = Math.floor(totalDays / 30.44); // Average days per month

      // Calculate next milestone
      const milestones = [50, 100, 150, 200, 250, 300, 365, 500, 730, 1000];
      const nextMilestone = milestones.find(m => m > totalDays) || totalDays + 100;
      const daysToMilestone = nextMilestone - totalDays;
      
      let milestoneName = `${nextMilestone} Days`;
      if (nextMilestone === 365) milestoneName = "1 Year Anniversary";
      if (nextMilestone === 730) milestoneName = "2 Year Anniversary";

      setTimeData({
        days: totalDays,
        hours,
        minutes,
        seconds,
        weeks,
        months,
        totalHours,
        totalMinutes,
        nextMilestone: daysToMilestone,
        milestoneName,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Main Counter Header */}
      <div className="flex items-center gap-3">
        <Heart className="w-8 h-8 text-primary animate-heart-beat fill-primary" />
        <span className="text-lg font-medium text-muted-foreground">Together for</span>
        <Heart className="w-8 h-8 text-primary animate-heart-beat fill-primary" />
      </div>
      
      {/* Main Days Counter */}
      <div className="grid grid-cols-4 gap-4 md:gap-6">
        <TimeUnit value={timeData.days} label="Days" highlight />
        <TimeUnit value={timeData.hours} label="Hours" />
        <TimeUnit value={timeData.minutes} label="Minutes" />
        <TimeUnit value={timeData.seconds} label="Seconds" />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatCard 
          icon={Calendar} 
          value={timeData.weeks} 
          label="Weeks" 
        />
        <StatCard 
          icon={Calendar} 
          value={timeData.months} 
          label="Months" 
        />
        <StatCard 
          icon={Clock} 
          value={timeData.totalHours.toLocaleString()} 
          label="Total Hours" 
        />
        <StatCard 
          icon={Sparkles} 
          value={timeData.nextMilestone} 
          label={`Days to ${timeData.milestoneName}`}
          accent 
        />
      </div>

      {/* Love Facts */}
      <div className="card-romantic rounded-2xl p-6 mt-4 text-center max-w-md">
        <p className="text-muted-foreground text-sm mb-2">Fun fact:</p>
        <p className="text-foreground font-medium">
          {timeData.days > 0 && (
            <>
              Your hearts have beaten together approximately{" "}
              <span className="text-gradient font-bold">
                {(timeData.totalMinutes * 70).toLocaleString()}
              </span>{" "}
              times! 💕
            </>
          )}
        </p>
      </div>

      {/* Anniversary Date */}
      <div className="text-center text-muted-foreground text-sm">
        <p>Our love story began on</p>
        <p className="font-display text-lg text-foreground mt-1">
          September 16, 2025 ✨
        </p>
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label, highlight }: { value: number; label: string; highlight?: boolean }) => (
  <div className="flex flex-col items-center">
    <div className={`card-romantic rounded-2xl p-4 md:p-6 min-w-[70px] md:min-w-[90px] ${highlight ? 'glow-effect' : ''}`}>
      <span className={`text-3xl md:text-5xl font-display font-bold ${highlight ? 'text-gradient' : 'text-foreground'}`}>
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="mt-2 text-sm md:text-base font-medium text-muted-foreground">{label}</span>
  </div>
);

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  accent 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  value: string | number; 
  label: string;
  accent?: boolean;
}) => (
  <div className={`card-romantic rounded-xl p-4 text-center ${accent ? 'border-2 border-coral/30' : ''}`}>
    <Icon className={`w-5 h-5 mx-auto mb-2 ${accent ? 'text-coral' : 'text-primary'}`} />
    <p className={`text-xl font-display font-bold ${accent ? 'text-coral' : 'text-foreground'}`}>
      {value}
    </p>
    <p className="text-xs text-muted-foreground mt-1">{label}</p>
  </div>
);

export default DaysCounter;
