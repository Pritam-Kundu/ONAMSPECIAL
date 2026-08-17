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

export default function MobilePlayer({
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
    <div className="w-full flex flex-col gap-4 max-w-[420px] mx-auto">
      {/* Playlist Selector */}
      <div className="flex gap-2 justify-center text-[12.5px] font-semibold tracking-wide">
        {playlists.map((pl) => (
          <button
            key={pl}
            onClick={() => onPlaylistChange(pl)}
            aria-label={`Select ${pl} playlist`}
            className={`transition-all py-2 px-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent [text-shadow:0_1px_8px_rgba(0,0,0,0.65)] ${
              activePlaylist === pl 
                ? "text-accent bg-black/10" 
                : "text-white/75 hover:text-white hover:bg-black/5"
            }`}
          >
            {pl}
          </button>
        ))}
      </div>

      {/* Main Player Card */}
      <div className="w-full rounded-[26px] p-[22px] border border-white/10 bg-gradient-to-b from-white/[0.18] to-white/[0.06] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] flex flex-col gap-6">
        
        {/* Row 1: Artwork + Title */}
        <div className="flex items-center gap-4">
          <div 
            className="relative w-[64px] h-[64px] rounded-full shadow-lg overflow-hidden flex-shrink-0 animate-[spin_8s_linear_infinite]"
            style={{ animationPlayState: isPlaying ? "running" : "paused" }}
          >
            {youtubePlayer}
            
            {/* Spindle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] bg-black/80 rounded-full ring-[1.5px] ring-white/40 z-10 pointer-events-none shadow-inner" />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h2 className="text-white font-semibold text-[16px] truncate leading-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
              {track.title}
            </h2>
            <p className="text-white/80 text-[13px] font-medium truncate mt-0.5">
              {track.artist}
            </p>
            <p className="text-white/50 text-[11px] truncate mt-0.5">
              {track.film} &middot; {track.year}
            </p>
          </div>
        </div>

        {/* Row 2: Seek bar */}
        <div className="w-full pt-1">
          <Seekbar progress={progress} duration={duration} onSeek={onSeek} />
        </div>

        {/* Row 3: Controls */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium tabular-nums text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            {formatTime(progress)}
          </span>
          
          <div className="flex items-center gap-5">
            <PrevNextButton onClick={onPrev} />
            <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} size="lg" />
            <PrevNextButton isNext onClick={onNext} />
          </div>
          
          <span className="text-[11px] font-medium tabular-nums text-white/60 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
