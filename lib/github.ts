const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const REVALIDATE = { next: { revalidate: 3600 } };

export interface GitHubOverview {
  repoCount: number;
  contributionsYtd: number;
}

const FALLBACK_OVERVIEW: GitHubOverview = {
  repoCount: 24,
  contributionsYtd: 1200,
};

function getYearStartIso(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0)).toISOString();
}

export async function getGitHubOverview(): Promise<GitHubOverview> {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME ?? "davidchanminpark";

  if (!token || !login) return FALLBACK_OVERVIEW;

  try {
    const res = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query GitHubOverview($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
              repositories(first: 1, ownerAffiliations: OWNER, isFork: false) {
                totalCount
              }
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `,
        variables: {
          login,
          from: getYearStartIso(),
          to: new Date().toISOString(),
        },
      }),
      ...REVALIDATE,
    });

    if (!res.ok) return FALLBACK_OVERVIEW;

    const payload = (await res.json()) as {
      data?: {
        user?: {
          repositories?: { totalCount?: number };
          contributionsCollection?: {
            totalCommitContributions?: number;
            contributionCalendar?: { totalContributions?: number };
          };
        };
      };
    };

    const user = payload.data?.user;
    if (!user) return FALLBACK_OVERVIEW;

    return {
      repoCount: user.repositories?.totalCount ?? FALLBACK_OVERVIEW.repoCount,
      contributionsYtd:
        user.contributionsCollection?.contributionCalendar?.totalContributions ??
        FALLBACK_OVERVIEW.contributionsYtd,
    };
  } catch {
    return FALLBACK_OVERVIEW;
  }
}
