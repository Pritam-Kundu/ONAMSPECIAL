"use client";

import React from "react";

export function PlayPauseButton({ isPlaying, onClick, size = "md" }: { isPlaying: boolean; onClick: () => void; size?: "sm" | "md" | "lg" }) {
  const iconClass = size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnClass = size === "lg" ? "h-[52px] w-[52px]" : size === "sm" ? "h-10 w-10" : "h-11 w-11";
  
  return (
    <button 
      onClick={onClick}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={`${btnClass} flex items-center justify-center rounded-full bg-gradient-to-b from-white/20 to-white/5 ring-1 ring-white/25 shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-all hover:scale-105 active:scale-95`}
    >
      {isPlaying ? (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

export function PrevNextButton({ isNext, onClick }: { isNext?: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      aria-label={isNext ? "Next track" : "Previous track"}
      className="h-10 w-10 flex items-center justify-center rounded-full text-white/80 transition-colors hover:text-white hover:bg-white/10 active:scale-95"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        {isNext ? (
          <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.677v6.646c0 1.427 1.556 2.33 2.805 1.643L10 13.999v2.978c0 1.427 1.556 2.33 2.805 1.643l6.944-3.966a1.875 1.875 0 0 0 0-3.286l-6.944-3.966C11.556 6.715 10 7.618 10 9.045v2.978L5.055 7.06Z" />
        ) : (
          <path d="M18.945 7.06c1.25-.713 2.805.19 2.805 1.617v6.646c0 1.427-1.556 2.33-2.805 1.643L14 13.999v2.978c0 1.427-1.556 2.33-2.805 1.643L4.25 14.654a1.875 1.875 0 0 1 0-3.286l6.944-3.966c1.25-.715 2.805.188 2.805 1.615v2.978l4.945-4.935Z" />
        )}
      </svg>
    </button>
  );
}

export function Seekbar({ progress, duration, onSeek }: { progress: number; duration: number; onSeek: (time: number) => void }) {
  const percentage = duration > 0 ? (progress / duration) * 100 : 0;
  
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    div.setPointerCapture(e.pointerId);
    
    const updateProgress = (event: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
      const rect = div.getBoundingClientRect();
      const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
      const newPercentage = x / rect.width;
      onSeek(newPercentage * duration);
    };
    
    updateProgress(e);
    
    const handlePointerMove = (event: PointerEvent) => {
      updateProgress(event);
    };
    
    const handlePointerUp = () => {
      div.releasePointerCapture(e.pointerId);
      div.removeEventListener("pointermove", handlePointerMove);
      div.removeEventListener("pointerup", handlePointerUp);
    };
    
    div.addEventListener("pointermove", handlePointerMove);
    div.addEventListener("pointerup", handlePointerUp);
  };
  
  return (
    <div 
      className="relative flex h-6 w-full items-center cursor-pointer touch-none group"
      onPointerDown={handlePointerDown}
    >
      <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent relative drop-shadow-[0_0_4px_rgba(245,166,35,0.5)]"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
        </div>
      </div>
      <div 
        className="absolute h-3 w-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity -ml-1.5"
        style={{ left: `${percentage}%` }}
      ></div>
    </div>
  );
}

export function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}
