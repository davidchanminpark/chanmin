export interface VlogStats {
  ytSubscribers: number;
  totalViews: number;
  totalDurationSeconds: number;
}

export interface VlogItem {
  youtubeId: string;
  title: string;
  channel: string;
  durationSeconds?: number;
}

export interface VlogChannel {
  channelId: string;
  name: string;
  /** "specific" — use listed videoIds; "playlist" — fetch all videos from playlistId */
  mode: "specific" | "playlist";
  videoIds?: string[];  // for mode: "specific"
  playlistId?: string;  // for mode: "playlist"
  /** Whether to show videos as cards. Default true. Set false to count in stats only. */
  showCards?: boolean;
  /** Channel to use for subscriber count on the stats panel */
  useForStats?: boolean;
}

export interface VlogData {
  stats: VlogStats;
  channels: VlogChannel[];
  fallbackItems: VlogItem[];
}

const vlogs: VlogData = {
  stats: {
    ytSubscribers: 0,
    totalViews: 0,
    totalDurationSeconds: 0,
  },
  channels: [
    {
      channelId: "UC5RtQUsee1YFE2w5-bPD7mg",
      name: "main",
      mode: "specific",
      videoIds: ["a7Zzv5EmWoQ", "ng5Lgsgja-M"],
      showCards: false, // count in stats only, don't show as cards
    },
    {
      channelId: "UCviOkZkMPFVyay9TRUe0VeQ",
      name: "vlogs",
      mode: "playlist",
      playlistId: "PLtVChZFY2TxriMD6sF9o0Fsnw4R38rsnZ",
      useForStats: true,
    },
  ],
  fallbackItems: [],
};

export default vlogs;
