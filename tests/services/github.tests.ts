import axios from "axios";
import { getUserTopLanguages, getGitHubProfileStats } from "../../src/services/github";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("services/github", () => {
  beforeEach(() => jest.clearAllMocks());

  it("getGitHubProfileStats returns normalized data", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        login: "octocat",
        name: "The Octocat",
        avatar_url: "https://example.com/avatar.png",
        public_repos: 5,
        followers: 10,
        following: 2,
        bio: "bio"
      }
    });
    const res = await getGitHubProfileStats("octocat");
    expect(res.name).toBe("The Octocat");
    expect(res.public_repos).toBe(5);
    expect(res.followers).toBe(10);
  });

  it("getUserTopLanguages returns aggregated languages", async () => {
    const repos = [{ language: "TypeScript" }, { language: "JavaScript" }, { language: "TypeScript" }];
    mockedAxios.get.mockResolvedValueOnce({ data: repos });
    const langs = await getUserTopLanguages("octocat");
    expect(langs.length).toBeGreaterThan(0);
    const ts = langs.find((l) => l.name === "TypeScript");
    expect(ts).toBeDefined();
    expect(ts?.count).toBeGreaterThanOrEqual(1);
  });
});