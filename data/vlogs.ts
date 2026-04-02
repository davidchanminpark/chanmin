export interface VlogStats {
  ytSubscribers: number;
  totalViews: number;
}

export interface VlogItem {
  youtubeId: string;
  title: string;
  channel: string;
}

export interface VlogData {
  stats: VlogStats;
  items: VlogItem[];
}

const vlogs: VlogData = {
  stats: {
    ytSubscribers: 0,
    totalViews: 0,
  },
  items: [
    {
      youtubeId: "dQw4w9WgXcQ",
      title: "Placeholder Vlog 1",
      channel: "main",
    },
    {
      youtubeId: "dQw4w9WgXcQ",
      title: "Placeholder Vlog 2",
      channel: "secondary",
    },
  ],
};

export default vlogs;
