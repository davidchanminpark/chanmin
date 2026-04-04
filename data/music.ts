export interface MusicStats {
  igFollowers: number;
  /** Auto-computed from instagram item views — do not set manually */
  igTotalViews: number;
  ytSubscribers: number;
  ytTotalViews: number;
  spotifyListeners: number;
  /** Auto-computed from spotify item streams — do not set manually */
  spotifyTotalStreams: number;
}

export interface MusicItem {
  type: "youtube" | "instagram" | "spotify";
  /** For instagram: the reel/post ID from the URL (instagram.com/reel/{embedId}/) */
  embedId: string;
  title: string;
  /** "reel" or "post" for instagram items. Defaults to "post" if omitted. */
  subtype?: "reel" | "post";
  /** View count for instagram reels — update manually when you check the app */
  views?: number;
  /** Stream count for spotify tracks — update manually when you check Spotify for Artists */
  streams?: number;
  /** Role tags e.g. ["Co-writer", "Producer"] */
  roles?: string[];
}

export interface MusicData {
  stats: Omit<MusicStats, "spotifyTotalStreams" | "igTotalViews">;
  items: MusicItem[];
}

/** Returns total streams summed across all spotify items */
export function getTotalSpotifyStreams(items: MusicItem[]): number {
  return items
    .filter((i) => i.type === "spotify")
    .reduce((sum, i) => sum + (i.streams ?? 0), 0);
}

/** Returns total views summed across all instagram items */
export function getTotalIgViews(items: MusicItem[]): number {
  return items
    .filter((i) => i.type === "instagram")
    .reduce((sum, i) => sum + (i.views ?? 0), 0);
}

const music: MusicData = {
  stats: {
    // Update these manually when you check the Instagram app
    igFollowers: 0,
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
    // To add a reel: grab the ID from instagram.com/reel/{ID}/
    // and add an entry like this:
    // {
    //   type: "instagram",
    //   subtype: "reel",
    //   embedId: "YOUR_REEL_ID",
    //   title: "Reel title",
    //   views: 1234,
    // },
    {
      type: "youtube",
      embedId: "dQw4w9WgXcQ",
      title: "Placeholder YouTube Video",
    },
  ],
};

export default music;
