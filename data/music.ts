export interface MusicStats {
  igFollowers: number;
  igTotalViews: number;
  ytSubscribers: number;
  ytTotalViews: number;
  spotifyListeners: number;
  /** Auto-computed from spotify item streams — do not set manually */
  spotifyTotalStreams: number;
}

export interface MusicItem {
  type: "youtube" | "instagram" | "spotify";
  embedId: string;
  title: string;
  /** Spotify stream count — update manually when you check Spotify for Artists */
  streams?: number;
  /** Role tags e.g. ["Co-writer", "Producer"] */
  roles?: string[];
}

export interface MusicData {
  stats: Omit<MusicStats, "spotifyTotalStreams">;
  items: MusicItem[];
}

/** Returns total streams summed across all spotify items */
export function getTotalSpotifyStreams(items: MusicItem[]): number {
  return items
    .filter((i) => i.type === "spotify")
    .reduce((sum, i) => sum + (i.streams ?? 0), 0);
}

const music: MusicData = {
  stats: {
    igFollowers: 0,
    igTotalViews: 0,
    ytSubscribers: 0,
    ytTotalViews: 0,
    spotifyListeners: 0,
  },
  items: [
    {
      type: "spotify",
      embedId: "3C5fSrfHazkcFLAwUsCn9x",
      title: "Nightmare (ft. Bella Poarch)",
      streams: 1031,
      roles: ["Co-writer", "Producer"],
    },
    {
      type: "spotify",
      embedId: "0QrExIK9cdFq9icloWLr3o",
      title: "Placeholder Track 2",
      streams: 100,
      roles: ["Producer"],
    },
    {
      type: "youtube",
      embedId: "dQw4w9WgXcQ",
      title: "Placeholder YouTube Video",
    },
    {
      type: "instagram",
      embedId: "placeholder",
      title: "Placeholder Instagram Post",
    },
  ],
};

export default music;
