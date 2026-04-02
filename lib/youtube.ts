import { MusicItem, MusicStats } from "@/data/music";
import { VlogItem, VlogStats } from "@/data/vlogs";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function getChannelStats(
  channelId: string
): Promise<{ ytSubscribers: number; totalViews: number } | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || !channelId) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/channels?part=statistics&id=${channelId}&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const stats = data.items?.[0]?.statistics;
    if (!stats) return null;

    return {
      ytSubscribers: parseInt(stats.subscriberCount ?? "0", 10),
      totalViews: parseInt(stats.viewCount ?? "0", 10),
    };
  } catch {
    return null;
  }
}

export async function getRecentVideos(
  channelId: string,
  limit = 5
): Promise<{ embedId: string; title: string }[] | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || !channelId) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=date&maxResults=${limit}&type=video&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    return (
      data.items?.map(
        (item: { id: { videoId: string }; snippet: { title: string } }) => ({
          embedId: item.id.videoId,
          title: item.snippet.title,
        })
      ) ?? null
    );
  } catch {
    return null;
  }
}

export async function getLiveMusicStats(
  fallback: MusicStats
): Promise<MusicStats> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";
  const live = await getChannelStats(channelId);
  if (!live) return fallback;
  return { ...fallback, ytSubscribers: live.ytSubscribers };
}

export async function getLiveMusicYouTubeItems(
  fallback: MusicItem[]
): Promise<MusicItem[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID ?? "";
  const videos = await getRecentVideos(channelId, 5);
  if (!videos) return fallback;

  const liveItems: MusicItem[] = videos.map((v) => ({
    type: "youtube",
    embedId: v.embedId,
    title: v.title,
  }));

  // Keep non-youtube items (spotify, instagram) from the fallback
  const otherItems = fallback.filter((item) => item.type !== "youtube");
  return [...liveItems, ...otherItems];
}

export async function getLiveVlogStats(
  fallback: VlogStats
): Promise<VlogStats> {
  const channelId =
    process.env.YOUTUBE_VLOGS_CHANNEL_ID ??
    process.env.YOUTUBE_CHANNEL_ID ??
    "";
  const live = await getChannelStats(channelId);
  if (!live) return fallback;
  return { ytSubscribers: live.ytSubscribers, totalViews: live.totalViews };
}

export async function getLiveVlogItems(
  fallback: VlogItem[]
): Promise<VlogItem[]> {
  const channelId =
    process.env.YOUTUBE_VLOGS_CHANNEL_ID ??
    process.env.YOUTUBE_CHANNEL_ID ??
    "";
  const videos = await getRecentVideos(channelId, 10);
  if (!videos) return fallback;

  return videos.map((v) => ({
    youtubeId: v.embedId,
    title: v.title,
    channel: process.env.YOUTUBE_VLOGS_CHANNEL_ID ? "secondary" : "main",
  }));
}
