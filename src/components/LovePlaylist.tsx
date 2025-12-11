'use client';
import { useState } from "react";
import ReactPlayer from 'react-player/youtube';
import { Heart, Music, Play, Pause } from "lucide-react";

const songs = [
  { title: "Perfect", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g" },
  { title: "All of Me", artist: "John Legend", url: "https://www.youtube.com/watch?v=450p7goxZqg" },
  { title: "A Thousand Years", artist: "Christina Perri", url: "https://www.youtube.com/watch?v=rtOvBOTyX00" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", url: "https://www.youtube.com/watch?v=lp-EO5I60KA" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", url: "https://www.youtube.com/watch?v=vYCh22bgY9g" },
  { title: "At Last", artist: "Etta James", url: "https://www.youtube.com/watch?v=d1-gP2A74yY" },
  { title: "Make You Feel My Love", artist: "Adele", url: "https://www.youtube.com/watch?v=0put0_a--Ng" },
  { title: "You Are The Reason", artist: "Calum Scott", url: "https://www.youtube.com/watch?v=ShZ978fBl6w" },
];

const LovePlaylist = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const selectSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(true);
  };

  return (
    <section className="py-16 px-4 bg-rose-soft/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Music className="w-6 h-6 text-coral" />
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
              Our <span className="text-gradient italic">Love Songs</span>
            </h2>
          </div>
          <p className="text-muted-foreground">Songs that remind us of our love</p>
        </div>

        {/* Now Playing Card */}
        <div className="card-romantic rounded-3xl p-6 mb-6 glow-effect">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-coral flex items-center justify-center">
              <Music className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Now Playing</p>
              <p className="font-display font-semibold text-xl text-foreground">
                {songs[currentSong].title}
              </p>
              <p className="text-muted-foreground">{songs[currentSong].artist}</p>
            </div>
            <button
              onClick={handlePlayPause}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>

          {/* Animated bars */}
          {isPlaying && (
            <div className="flex items-end justify-center gap-1 mt-4 h-8">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Playlist */}
        <div className="card-romantic rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              Our Playlist
            </h3>
          </div>
          <div className="divide-y divide-border">
            {songs.map((song, index) => (
              <button
                key={index}
                onClick={() => selectSong(index)}
                className={`w-full p-4 flex items-center gap-4 text-left hover:bg-rose-soft/50 transition-colors ${
                  currentSong === index ? 'bg-rose-soft' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentSong === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {currentSong === index && isPlaying ? (
                    <Music className="w-4 h-4 animate-pulse" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${currentSong === index ? 'text-primary' : 'text-foreground'}`}>
                    {song.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                {currentSong === index && <Heart className="w-4 h-4 text-primary fill-primary" />}
              </button>
            ))}
          </div>
        </div>

        {/* Hidden ReactPlayer */}
        {isClient && (
          <div className="hidden">
            <ReactPlayer
              url={songs[currentSong].url}
              playing={isPlaying}
              onEnded={handleNext}
              onError={(e) => console.error('ReactPlayer error:', e)}
              width="0"
              height="0"
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 1,
                  }
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default LovePlaylist;
