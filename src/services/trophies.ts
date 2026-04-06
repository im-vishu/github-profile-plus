import axios from "axios";

export interface Trophy {
  title: string;
  value: number | string;
  emoji: string;
}

export async function getUserTrophies(username: string): Promise<Trophy[]> {
  const { data: user } = await axios.get(`https://api.github.com/users/${username}`);
  return [
    { title: "Public Repos", emoji: "📦", value: user.public_repos },
    { title: "Followers", emoji: "🌟", value: user.followers },
    { title: "Following", emoji: "👥", value: user.following },
    { title: "Gists", emoji: "📝", value: user.public_gists },
    { title: "Created", emoji: "🎉", value: user.created_at.slice(0,10) }
  ];
}