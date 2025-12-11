'use client';
import { useState } from "react";
import { Heart, Send, Sparkles } from "lucide-react";

const SendLove = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([
    "I love you more than words can say! 💕",
    "You make every day brighter ✨",
  ]);

  const createHearts = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
      y: rect.top,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 2000);
  };

  const sendMessage = () => {
    if (message.trim()) {
      setSentMessages((prev) => [message, ...prev].slice(0, 5));
      setMessage("");
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Send className="w-6 h-6 text-coral" />
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Send <span className="text-gradient italic">Love</span>
          </h2>
        </div>

        {/* Send Kiss Button */}
        <div className="card-romantic rounded-3xl p-8 mb-8 relative overflow-visible">
          <p className="text-muted-foreground mb-6">Click to send love to Oshi!</p>
          <button
            onClick={createHearts}
            className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-primary to-coral text-primary-foreground font-semibold text-lg hover:scale-105 transition-transform"
          >
            <span className="flex items-center gap-2">
              Send a Kiss <Heart className="w-5 h-5 fill-current group-hover:animate-heart-beat" />
            </span>
          </button>

          {/* Floating hearts animation */}
          {hearts.map((heart) => (
            <Heart
              key={heart.id}
              className="fixed text-primary fill-primary pointer-events-none animate-[rise_2s_ease-out_forwards]"
              style={{
                left: heart.x,
                top: heart.y,
                width: 20 + Math.random() * 15,
                height: 20 + Math.random() * 15,
              }}
            />
          ))}
        </div>

        {/* Quick Love Notes */}
        <div className="card-romantic rounded-2xl p-6">
          <h3 className="font-display font-semibold text-foreground mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            Quick Love Notes
          </h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write a sweet message..."
              className="flex-1 px-4 py-3 rounded-full bg-rose-soft border-none outline-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {sentMessages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-rose-soft/50 rounded-xl px-4 py-2 text-sm text-foreground animate-fade-in"
              >
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes rise {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px) scale(0.5) rotate(45deg);
          }
        }
      `}</style>
    </section>
  );
};

export default SendLove;
