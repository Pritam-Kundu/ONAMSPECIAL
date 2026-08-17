import { Track } from "../types/music";

export const playlists: Record<string, Track[]> = {
  "Onam Classics": [
    {
      id: "track-01",
      title: "Thiruvavaniraavu",
      artist: "Unni Menon, Sithara",
      film: "Jacobinte Swargarajyam",
      year: 2016,
      duration: 254,
      videoId: "VrrnflVEiMg", // Official lyrical/audio video
    }
  ],
  "Golden Memories": [
    {
      id: "track-02",
      title: "Ponnona Tharangini",
      artist: "K. J. Yesudas",
      film: "Uthradapoonilave",
      year: 1994,
      duration: 310,
      videoId: "dQw4w9WgXcQ",
    }
  ],
  "Evening Paattukal": [
    {
      id: "track-03",
      title: "Thumbi Vaa",
      artist: "S. Janaki",
      film: "Olangal",
      year: 1982,
      duration: 275,
      videoId: "dQw4w9WgXcQ",
    }
  ],
};

export const playlistNames = Object.keys(playlists);
