export interface MusicStats {
  igFollowers: number;
  ytSubscribers: number;
  spotifyListeners: number;
}

export interface MusicItem {
  type: "youtube" | "instagram" | "spotify";
  embedId: string;
  title: string;
}

export interface MusicData {
  stats: MusicStats;
  items: MusicItem[];
}

const music: MusicData = {
  stats: {
    igFollowers: 0,
    ytSubscribers: 0,
    spotifyListeners: 0,
  },
  items: [
    {
      type: "youtube",
      embedId: "dQw4w9WgXcQ",
      title: "Placeholder YouTube Video",
    },
    {
      type: "spotify",
      embedId: "11dFghVXANMlKmJXsNCbNl",
      title: "Placeholder Spotify Track",
    },
    {
      type: "instagram",
      embedId: "placeholder",
      title: "Placeholder Instagram Post",
    },
  ],
};

export default music;
