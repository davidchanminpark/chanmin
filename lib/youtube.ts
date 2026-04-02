import { MusicItem, MusicStats } from "@/data/music";
import { VlogChannel, VlogItem, VlogStats } from "@/data/vlogs";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const REVALIDATE = { next: { revalidate: 3600 } };

function apiKey(): string | null {
  return process.env.YOUTUBE_API_KEY ?? null;
}

export async function getChannelStats(
  channelId: string
): Promise<{ ytSubscribers: number; totalViews: number } | null> {
  const key = apiKey();
  if (!key || !channelId) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/channels?part=statistics&id=${channelId}&key=${key}`,
      REVALIDATE
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
  const key = apiKey();
  if (!key || !channelId) return null;

  try {
    const res = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=date&maxResults=${limit}&type=video&key=${key}`,
      REVALIDATE
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

/** Fetch video IDs from a playlist (up to 50). */
async function getPlaylistVideoIds(playlistId: string): Promise<string[]> {
  const key = apiKey();
  if (!key || !playlistId) return [];

  try {
    const res = await fetch(
      `${BASE_URL}/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${key}`,
      REVALIDATE
    );
    if (!res.ok) return [];

    const data = await res.json();
    return (
      data.items?.map(
        (item: { contentDetails: { videoId: string } }) =>
          item.contentDetails.videoId
      ) ?? []
    );
  } catch {
    return [];
  }
}

/** Fetch snippet + statistics for specific video IDs (max 50 per call). */
async function getVideoDetails(
  videoIds: string[]
): Promise<{ embedId: string; title: string; views: number }[]> {
  const key = apiKey();
  if (!key || videoIds.length === 0) return [];

  try {
    const res = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&id=${videoIds.join(",")}&key=${key}`,
      REVALIDATE
    );
    if (!res.ok) return [];

    const data = await res.json();
    return (
      data.items?.map(
        (item: {
          id: string;
          snippet: { title: string };
          statistics: { viewCount?: string };
        }) => ({
          embedId: item.id,
          title: item.snippet.title,
          views: parseInt(item.statistics.viewCount ?? "0", 10),
        })
      ) ?? []
    );
  } catch {
    return [];
  }
}

async function getItemsForChannel(
  channel: VlogChannel
): Promise<{ items: VlogItem[]; views: number }> {
  if (channel.mode === "specific" && channel.videoIds?.length) {
    const details = await getVideoDetails(channel.videoIds);
    const totalViews = details.reduce((sum, v) => sum + v.views, 0);
    if (channel.showCards === false) {
      return { items: [], views: totalViews };
    }
    return {
      items: details.map((v) => ({
        youtubeId: v.embedId,
        title: v.title,
        channel: channel.name,
      })),
      views: totalViews,
    };
  }

  if (channel.mode === "playlist" && channel.playlistId) {
    const videoIds = await getPlaylistVideoIds(channel.playlistId);
    const details = await getVideoDetails(videoIds);
    const totalViews = details.reduce((sum, v) => sum + v.views, 0);

    if (channel.showCards === false) {
      return { items: [], views: totalViews };
    }
    return {
      items: details.map((v) => ({
        youtubeId: v.embedId,
        title: v.title,
        channel: channel.name,
      })),
      views: totalViews,
    };
  }

  return { items: [], views: 0 };
}

// ─── Music ───────────────────────────────────────────────────────────────────

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

  const otherItems = fallback.filter((item) => item.type !== "youtube");
  return [...liveItems, ...otherItems];
}

// ─── Vlogs ────────────────────────────────────────────────────────────────────

export async function getLiveVlogStats(
  channels: VlogChannel[],
  fallback: VlogStats
): Promise<VlogStats> {
  if (!apiKey()) return fallback;

  const statsChannel = channels.find((c) => c.useForStats) ?? channels[0];
  const [subscriberData, channelResults] = await Promise.all([
    statsChannel ? getChannelStats(statsChannel.channelId) : null,
    Promise.all(channels.map(getItemsForChannel)),
  ]);

  const totalViews = channelResults.reduce((sum, r) => sum + r.views, 0);

  return {
    ytSubscribers: subscriberData?.ytSubscribers ?? fallback.ytSubscribers,
    totalViews: totalViews > 0 ? totalViews : fallback.totalViews,
  };
}

export async function getLiveVlogItems(
  channels: VlogChannel[],
  fallback: VlogItem[]
): Promise<VlogItem[]> {
  if (!apiKey()) return fallback;

  const results = await Promise.all(channels.map(getItemsForChannel));
  const items = results.flatMap((r) => r.items);
  return items.length > 0 ? items : fallback;
}
