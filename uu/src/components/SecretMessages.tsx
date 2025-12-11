import { useState } from "react";
import { Heart, Lock, Unlock, Eye, EyeOff } from "lucide-react";

const SecretMessages = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const SECRET_PASSWORD = "oshi"; // Simple password for demo

  const messages = [
    {
      from: "Vishu",
      message: "I still remember the butterflies I felt when I first saw you. That feeling never went away. 💕",
      date: "Day 1"
    },
    {
      from: "Vishu",
      message: "You're not just my girlfriend, you're my best friend, my confidant, and my soulmate.",
      date: "Day 30"
    },
    {
      from: "Vishu",
      message: "Every time I look at you, I fall in love all over again. You're my everything, Oshi.",
      date: "Day 86"
    },
  ];

  const handleUnlock = () => {
    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Wrong password! Hint: Vishu's love 💗");
    }
  };

  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            {isUnlocked ? (
              <Unlock className="w-6 h-6 text-primary" />
            ) : (
              <Lock className="w-6 h-6 text-coral" />
            )}
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Secret <span className="text-gradient italic">Messages</span>
            </h2>
          </div>
          <p className="text-muted-foreground">
            {isUnlocked ? "Our private love notes 💌" : "Enter the password to unlock our secrets"}
          </p>
        </div>

        {!isUnlocked ? (
          <div className="card-romantic rounded-3xl p-8 text-center">
            <Lock className="w-16 h-16 mx-auto mb-6 text-primary/50" />
            <p className="text-muted-foreground mb-6">This section is locked with love 💕</p>
            
            <div className="max-w-xs mx-auto">
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 pr-10 rounded-full bg-rose-soft border-none outline-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {error && <p className="text-sm text-coral mb-4">{error}</p>}
              
              <button
                onClick={handleUnlock}
                className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Unlock with Love
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="card-romantic rounded-2xl p-6"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary">From {msg.from}</span>
                  <span className="text-xs text-muted-foreground">{msg.date}</span>
                </div>
                <p className="text-foreground italic leading-relaxed">"{msg.message}"</p>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <button
                onClick={() => setIsUnlocked(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto"
              >
                <Lock className="w-4 h-4" />
                Lock again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SecretMessages;
