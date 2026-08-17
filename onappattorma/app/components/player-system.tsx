"use client";

import { useState, useCallback, useEffect } from "react";
import { track } from "@vercel/analytics";
import { playlists, playlistNames } from "../lib/tracks";
import DesktopPlayer from "./desktop-player";
import MobilePlayer from "./mobile-player";
import YoutubePlayer from "./youtube-player";

export default function PlayerSystem() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const [activePlaylist, setActivePlaylist] = useState(playlistNames[0]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seekToTime, setSeekToTime] = useState<number | null>(null);
  
  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const currentPlaylistTracks = playlists[activePlaylist] || [];
  const currentTrack = currentPlaylistTracks[trackIndex];

  const handleNext = useCallback(() => {
    setTrackIndex((prev) => (prev + 1) % currentPlaylistTracks.length);
    setProgress(0);
    track("track_next", { trackId: currentTrack?.id });
  }, [currentPlaylistTracks.length, currentTrack?.id]);

  const handlePrev = useCallback(() => {
    setTrackIndex((prev) => (prev - 1 + currentPlaylistTracks.length) % currentPlaylistTracks.length);
    setProgress(0);
    track("track_previous", { trackId: currentTrack?.id });
  }, [currentPlaylistTracks.length, currentTrack?.id]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      track(next ? "track_play" : "track_pause", { trackId: currentTrack?.id });
      return next;
    });
  }, [currentTrack?.id]);

  const handleSeek = useCallback((time: number) => {
    setSeekToTime(time);
    setProgress(time);
  }, []);

  const handleStateChange = useCallback((state: string) => {
    if (state === "PLAYING") setIsPlaying(true);
    else if (state === "PAUSED") setIsPlaying(false);
    else if (state === "ENDED") handleNext();
  }, [handleNext]);

  const handleError = useCallback((code: number) => {
    track("youtube_error", { errorCode: code.toString(), videoId: currentTrack?.videoId, trackId: currentTrack?.id });
    handleNext();
  }, [currentTrack?.videoId, currentTrack?.id, handleNext]);

  const handlePlaylistChange = useCallback((name: string) => {
    setActivePlaylist(name);
    setTrackIndex(0);
    setProgress(0);
    setIsPlaying(true);
    track("playlist_switch", { playlist: name });
  }, []);

  if (!mounted || !currentTrack) return null;

  const ytPlayer = (
    <YoutubePlayer
      videoId={currentTrack.videoId}
      isPlaying={isPlaying}
      onReady={(d) => setDuration(d)}
      onProgress={setProgress}
      onStateChange={handleStateChange}
      onError={handleError}
      seekToTime={seekToTime}
    />
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-8 sm:pb-12 flex flex-col items-center">
      {isMobile ? (
        <MobilePlayer
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onSeek={handleSeek}
          playlists={playlistNames}
          activePlaylist={activePlaylist}
          onPlaylistChange={handlePlaylistChange}
          youtubePlayer={ytPlayer}
        />
      ) : (
        <DesktopPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onSeek={handleSeek}
          playlists={playlistNames}
          activePlaylist={activePlaylist}
          onPlaylistChange={handlePlaylistChange}
          youtubePlayer={ytPlayer}
        />
      )}
    </div>
  );
}
