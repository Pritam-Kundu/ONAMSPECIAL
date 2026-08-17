"use client";

import { useEffect, useRef } from "react";
import { loadYouTubeAPI } from "../lib/youtube";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type Props = {
  videoId: string;
  isPlaying: boolean;
  onReady: (duration: number) => void;
  onProgress: (currentTime: number) => void;
  onStateChange: (state: "PLAYING" | "PAUSED" | "ENDED" | "BUFFERING") => void;
  onError: (code: number) => void;
  seekToTime?: number | null;
};

export default function YoutubePlayer({
  videoId,
  isPlaying,
  onReady,
  onProgress,
  onStateChange,
  onError,
  seekToTime,
}: Props) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const isReady = useRef(false);

  useEffect(() => {
    let isMounted = true;
    
    loadYouTubeAPI().then(() => {
      if (!isMounted || !containerRef.current) return;
      
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 1, // Let user interact
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            isReady.current = true;
            onReady(e.target.getDuration());
            if (isPlaying) {
              e.target.playVideo();
            }
          },
          onStateChange: (e: any) => {
            const state = e.data;
            if (state === window.YT.PlayerState.PLAYING) {
              onStateChange("PLAYING");
              
              if (progressInterval.current) clearInterval(progressInterval.current);
              progressInterval.current = setInterval(() => {
                if (playerRef.current?.getCurrentTime) {
                  onProgress(playerRef.current.getCurrentTime());
                }
              }, 500);
            } else if (state === window.YT.PlayerState.PAUSED) {
              onStateChange("PAUSED");
              if (progressInterval.current) clearInterval(progressInterval.current);
            } else if (state === window.YT.PlayerState.ENDED) {
              onStateChange("ENDED");
              if (progressInterval.current) clearInterval(progressInterval.current);
            } else if (state === window.YT.PlayerState.BUFFERING) {
              onStateChange("BUFFERING");
            }
          },
          onError: (e: any) => {
            onError(e.data);
          }
        }
      });
    });

    return () => {
      isMounted = false;
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady.current && playerRef.current && playerRef.current.loadVideoById) {
      if (isPlaying) {
        playerRef.current.loadVideoById(videoId);
      } else {
        playerRef.current.cueVideoById(videoId);
      }
    }
  }, [videoId]);

  useEffect(() => {
    if (isReady.current && playerRef.current && playerRef.current.getPlayerState) {
      const state = playerRef.current.getPlayerState();
      if (isPlaying && state !== window.YT.PlayerState.PLAYING) {
        playerRef.current.playVideo();
      } else if (!isPlaying && state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (seekToTime !== null && seekToTime !== undefined && isReady.current && playerRef.current?.seekTo) {
      playerRef.current.seekTo(seekToTime, true);
    }
  }, [seekToTime]);

  return (
    <div className="w-full h-full bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
