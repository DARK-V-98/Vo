import { useState } from "react";
import { Check, Heart, MapPin, Plane, Star, Utensils, Camera, Music, Home, Sparkles } from "lucide-react";

const bucketListItems = [
  { icon: Plane, text: "Travel to Paris together", category: "Travel" },
  { icon: Utensils, text: "Cook a romantic dinner at home", category: "Date" },
  { icon: Camera, text: "Do a couples photoshoot", category: "Memory" },
  { icon: MapPin, text: "Watch sunrise at the beach", category: "Adventure" },
  { icon: Music, text: "Attend a concert together", category: "Fun" },
  { icon: Star, text: "Stargaze on a clear night", category: "Romance" },
  { icon: Home, text: "Build a blanket fort", category: "Cozy" },
  { icon: Heart, text: "Write love letters to each other", category: "Romance" },
  { icon: Sparkles, text: "Celebrate 1 year anniversary", category: "Milestone" },
  { icon: Plane, text: "Go on a road trip adventure", category: "Travel" },
  { icon: Camera, text: "Create a scrapbook of memories", category: "Memory" },
  { icon: Utensils, text: "Try a new cuisine together", category: "Food" },
];

const BucketList = () => {
  const [completedItems, setCompletedItems] = useState<number[]>([1, 7]); // Some pre-completed

  const toggleComplete = (index: number) => {
    setCompletedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const progress = Math.round((completedItems.length / bucketListItems.length) * 100);

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
            Our <span className="text-gradient italic">Bucket List</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Dreams we want to make come true together
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{completedItems.length} completed</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bucketListItems.map((item, index) => {
            const isCompleted = completedItems.includes(index);
            return (
              <button
                key={index}
                onClick={() => toggleComplete(index)}
                className={`card-romantic rounded-xl p-5 flex items-center gap-4 text-left transition-all hover:scale-[1.02] ${
                  isCompleted ? 'ring-2 ring-primary/30 bg-rose-soft/50' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted ? 'bg-primary' : 'bg-muted'
                }`}>
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium transition-colors ${
                    isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}>
                    {item.text}
                  </p>
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                </div>
                {isCompleted && <Heart className="w-5 h-5 text-primary fill-primary" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BucketList;
