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
  /** Optional description text, used for parsing multi-song YouTube sessions. */
  description?: string;
  /** Optional explicit song titles when one item represents multiple songs. */
  songTitles?: string[];
  /** "reel" or "post" for instagram items. Defaults to "post" if omitted. */
  subtype?: "reel" | "post";
  /** Duration in seconds. Set manually for spotify/instagram items; fetched live for YouTube items. */
  durationSeconds?: number;
  /** View count for video items; instagram is manual, youtube can be fetched live. */
  views?: number;
  /** Row label for grouping instagram items (e.g. "50 Day Songwriting Challenge", "Covers") */
  group?: string;
  /** Stream count for spotify tracks — update manually when you check Spotify for Artists */
  streams?: number;
  /** Role tags e.g. ["Co-writer", "Producer"] */
  roles?: string[];
}

export interface MusicData {
  stats: Omit<MusicStats, "spotifyTotalStreams" | "igTotalViews">;
  items: MusicItem[];
}

function normalizeSongTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/^[\s"'`]+|[\s"'`]+$/g, "");
}

function isCoverItem(item: MusicItem): boolean {
  return item.group?.toLowerCase().includes("cover") ?? false;
}

function parseSongTitlesFromDescription(description?: string): string[] {
  if (!description) return [];

  const lines = description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const timestampMatches = lines
    .map((line) => {
      const match = line.match(
        /^(?:\d+\s*[\.\)-]\s*)?(?:(?:\d{1,2}:)?\d{1,2}:\d{2})\s*(?:[-|:]\s*)?(.+)$/
      );
      if (!match) return null;

      const title = match[1]
        .replace(/\s*\([^)]*\)\s*$/g, "")
        .replace(/\s*\[[^\]]*\]\s*$/g, "")
        .trim();

      return title || null;
    })
    .filter((value): value is string => Boolean(value));

  return Array.from(new Set(timestampMatches));
}

function getSongTitlesForItem(item: MusicItem): string[] {
  const explicitTitles =
    item.songTitles?.map((title) => normalizeSongTitle(title)).filter(Boolean) ?? [];
  if (explicitTitles.length > 0) return explicitTitles;

  if (item.type === "youtube") {
    const parsedTitles = parseSongTitlesFromDescription(item.description)
      .map((title) => normalizeSongTitle(title))
      .filter(Boolean);
    if (parsedTitles.length > 0) return parsedTitles;
  }

  const title = normalizeSongTitle(item.title);
  return title ? [title] : [];
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

export function getTotalYouTubeViews(items: MusicItem[]): number {
  return items
    .filter((i) => i.type === "youtube")
    .reduce((sum, i) => sum + (i.views ?? 0), 0);
}

/** Returns total duration summed across all content items shown on the page */
export function getTotalContentDuration(items: MusicItem[]): number {
  return items
    .reduce((sum, i) => sum + (i.durationSeconds ?? 0), 0);
}

export function getSongCounts(items: MusicItem[]): {
  totalSongs: number;
  originalSongs: number;
  totalCovers: number;
} {
  const songs = new Map<string, { isCover: boolean }>();

  for (const item of items) {
    const nextIsCover = isCoverItem(item);
    for (const key of getSongTitlesForItem(item)) {
      const existing = songs.get(key);

      songs.set(key, {
        isCover: existing ? existing.isCover || nextIsCover : nextIsCover,
      });
    }
  }

  let totalCovers = 0;
  for (const song of songs.values()) {
    if (song.isCover) totalCovers += 1;
  }

  return {
    totalSongs: songs.size,
    originalSongs: songs.size - totalCovers,
    totalCovers,
  };
}

const music: MusicData = {
  stats: {
    // Update these manually when you check the Instagram app
    igFollowers: 126,
    ytSubscribers: 0,
    ytTotalViews: 0,
    spotifyListeners: 0,
  },
  items: [
    {
      type: "spotify",
      embedId: "0QrExIK9cdFq9icloWLr3o",
      title: "thinking of you",
      durationSeconds: 279,
      roles: ["Producer"],
    },
    {
      type: "spotify",
      embedId: "3C5fSrfHazkcFLAwUsCn9x",
      title: "It's Alright",
      durationSeconds: 196,
      streams: 1031,
      roles: ["Co-writer", "Producer"],
    },
    // To add a reel: grab the ID from instagram.com/reel/{ID}/
    // and add an entry like this:
    // {
    //   type: "instagram",
    //   subtype: "reel",
    //   embedId: "YOUR_REEL_ID",
    //   title: "Reel title",
    //   durationSeconds: 42,
    //   views: 1234,
    //   group: "50 Day Songwriting Challenge", // or "Covers", etc.
    // },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQqSF2CEec8",
      title: "Only You",
      views: 959,
      durationSeconds: 60,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQvFCWsgf_f",
      title: "Feast",
      views: 970,
      durationSeconds: 74,
      group: "50 Day Songwriting Challenge",
    },




      
     


    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQ0AyjGkiuD",
      title: "Jubilee",
      views: 1045,
      durationSeconds: 56,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQ6GWXOEe5m",
      title: "With Me",
      durationSeconds: 56,
      views: 680,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQ_SIP1Ecsu",
      title: "Jingle",
      durationSeconds: 44,
      views: 1086,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DRBqdvqDi3N",
      title: "Nintendo",
      views: 900,
      durationSeconds: 80,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DRGw6dWDk_J",
      title: "If This World Could Be",
      views: 805,
      durationSeconds: 85,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DRMPhEzkUKc",
      title: "Make It Now",
      views: 483,
      durationSeconds: 67,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DROYjbqkfBH",
      title: "The Lord Will Bless",
      durationSeconds: 65,
      views: 1095,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DRXqrRxklXZ",
      title: "Wave It",
      durationSeconds: 86,
      views: 595,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DReIRKVDuiV",
      title: "Far Away This Christmas",
      views: 615,
      durationSeconds: 89,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DRg0RfIDmEq",
      title: "Thank You For Your Love",
      views: 623,
      durationSeconds: 91,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DU45stgFzye",
      title: "Do You Love Me More Than These",
      views: 492,
      durationSeconds: 142,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DU68awcD-og",
      title: "Do You Love Me More Than These Pt. 2",
      views: 378,
      durationSeconds: 119,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DVsQLj0AIs8",
      title: "Goel (He Is Alive)",
      views: 427,
      durationSeconds: 94,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DVxTZiyj9hH",
      title: "주는 나의 빛 (The Lord Is My Light)",
      views: 364,
      durationSeconds: 128,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DWAXFJij_uh",
      title: "You & The Sun",
      views: 348,
      durationSeconds: 39,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DWid-3aj2N6",
      title: "How Could I Deny",
      views: 610,
      durationSeconds: 126,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DWmx5GYAZ0-",
      title: "Paradise",
      views: 494,
      durationSeconds: 67,
      group: "50 Day Songwriting Challenge",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "C_cqLMRscok",
      title: "In Christ Alone",
      views: 656,
      durationSeconds: 62,
      group: "Instagram Covers",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DFOmYu3M1r5",
      title: "Bad",
      views: 415,
      durationSeconds: 82,
      group: "Instagram Covers",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DGUn2xrs8fi",
      title: "Give Me Jesus",
      views: 1917,
      durationSeconds: 64,
      group: "Instagram Covers",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DQX8thRDy0d",
      title: "I Offer My Life",
      views: 492,
      durationSeconds: 109,
      group: "Instagram Covers",
    },
    {
      type: "instagram",
      subtype: "reel",
      embedId: "DSRPdfAETC5",
      title: "O Come To The Altar",
      views: 1139,
      durationSeconds: 62,
      group: "Instagram Covers",
    },
  ],
};

export default music;
