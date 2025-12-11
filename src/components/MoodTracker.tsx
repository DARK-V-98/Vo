'use client';
import { useState, useEffect } from "react";
import { Heart, Star, Zap, Moon, Sun, Coffee, Music, Smile } from "lucide-react";
import { useAuth, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';

const moods = [
  { icon: Heart, label: "Romantic", color: "text-primary", bg: "bg-primary/10" },
  { icon: Star, label: "Happy", color: "text-gold", bg: "bg-gold/10" },
  { icon: Zap, label: "Excited", color: "text-coral", bg: "bg-coral/10" },
  { icon: Moon, label: "Peaceful", color: "text-indigo-400", bg: "bg-indigo-400/10" },
  { icon: Sun, label: "Energetic", color: "text-amber-400", bg: "bg-amber-400/10" },
  { icon: Coffee, label: "Cozy", color: "text-amber-600", bg: "bg-amber-600/10" },
  { icon: Music, label: "Playful", color: "text-pink-400", bg: "bg-pink-400/10" },
  { icon: Smile, label: "Content", color: "text-emerald-400", bg: "bg-emerald-400/10" },
];

const MoodTracker = () => {
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const { user } = useAuth();
  const firestore = useFirestore();

  const today = new Date().toISOString().split('T')[0];
  const moodsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'moods', today);
  }, [firestore, today]);

  const { data: moodsData } = useDoc<{ vishu?: number; oshi?: number }>(moodsRef);

  const vishuMood = moodsData?.vishu;
  const oshiMood = moodsData?.oshi;

  useEffect(() => {
    if (vishuMood !== undefined && oshiMood !== undefined) {
      const diff = Math.abs(vishuMood - oshiMood);
      const score = 100 - (diff * 8) + Math.floor(Math.random() * 10);
      setCompatibility(Math.min(100, Math.max(75, score)));
    } else {
      setCompatibility(null);
    }
  }, [vishuMood, oshiMood]);

  const handleSetMood = (moodIndex: number, person: 'vishu' | 'oshi') => {
    if (!moodsRef) return;
    const newMood = { [person]: moodIndex };
    setDocumentNonBlocking(moodsRef, newMood, { merge: true });
  };

  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
            Today's <span className="text-gradient italic">Mood</span>
          </h2>
          <p className="text-muted-foreground">How are you both feeling today?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vishu's Mood */}
          <div className="card-romantic rounded-2xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 text-center">
              Vishu's Mood 💙
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {moods.map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSetMood(idx, 'vishu')}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    vishuMood === idx
                      ? `${mood.bg} ring-2 ring-current ${mood.color} scale-105` 
                      : 'hover:bg-muted'
                  }`}
                >
                  <mood.icon className={`w-6 h-6 ${mood.color}`} />
                  <span className="text-xs text-muted-foreground">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Oshi's Mood */}
          <div className="card-romantic rounded-2xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 text-center">
              Oshi's Mood 💗
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {moods.map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSetMood(idx, 'oshi')}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    oshiMood === idx
                      ? `${mood.bg} ring-2 ring-current ${mood.color} scale-105` 
                      : 'hover:bg-muted'
                  }`}
                >
                  <mood.icon className={`w-6 h-6 ${mood.color}`} />
                  <span className="text-xs text-muted-foreground">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compatibility Result */}
        {compatibility !== null && (
          <div className="mt-8 text-center animate-scale-in">
            <div className="card-romantic rounded-2xl p-8 inline-block">
              <p className="text-muted-foreground mb-2">Today's Mood Sync</p>
              <div className="text-5xl font-display font-bold text-gradient mb-2">
                {compatibility}%
              </div>
              <p className="text-foreground font-medium">
                {compatibility >= 90 ? "Perfect Harmony! 💕" : 
                 compatibility >= 80 ? "In Sync Today! ✨" : 
                 "Balancing Each Other! 🌟"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MoodTracker;
