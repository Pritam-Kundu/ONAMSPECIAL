
"use client";

import { Track } from "../types/music";
import { PlayPauseButton, PrevNextButton, Seekbar, formatTime } from "./player-controls";

type Props = {
  track: Track;
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  playlists: string[];
  activePlaylist: string;
  onPlaylistChange: (name: string) => void;
  youtubePlayer: React.ReactNode;
};

export default function DesktopPlayer({
  track,
  isPlaying,
  progress,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  playlists,
  activePlaylist,
  onPlaylistChange,
  youtubePlayer,
}: Props) {
  return (
    <div className="w-full max-w-xl flex flex-col gap-4">
      {/* Playlist Selector */}
      <div className="flex gap-3 justify-center text-xs sm:text-sm font-medium">
        {playlists.map((pl) => (
          <button
            key={pl}
            onClick={() => onPlaylistChange(pl)}
            className={`transition-colors drop-shadow-md ${
              activePlaylist === pl 
                ? "text-accent" 
                : "text-white/60 hover:text-white/90"
            }`}
          >
            {pl}
          </button>
        ))}
      </div>

      {/* Main Player */}
      <div className="w-full rounded-full p-3 pr-5 border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] flex items-center gap-5">
        
        {/* Vinyl */}
        <div 
          className="relative w-[80px] h-[80px] rounded-full shadow-lg overflow-hidden flex-shrink-0 animate-[spin_8s_linear_infinite]"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {youtubePlayer}
          
          {/* Spindle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-black/70 rounded-full ring-2 ring-white/40 z-10 pointer-events-none shadow-inner" />
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
          <div className="truncate">
            <h2 className="text-white font-medium text-base truncate drop-shadow-sm">{track.title}</h2>
            <p className="text-white/60 text-xs truncate">{track.artist} &middot; {track.film}</p>
          </div>
          
          <div className="flex items-center gap-3 w-full">
            <span className="text-[10.5px] font-medium tabular-nums text-white/50 w-8 flex-shrink-0 text-right">{formatTime(progress)}</span>
            <div className="flex-1">
              <Seekbar progress={progress} duration={duration} onSeek={onSeek} />
            </div>
            <span className="text-[10.5px] font-medium tabular-nums text-white/50 w-8 flex-shrink-0">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <PrevNextButton onClick={onPrev} />
          <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
          <PrevNextButton isNext onClick={onNext} />
        </div>
      </div>
    </div>
  );
}
