import request from "supertest";
import app from "../../src/app";
import * as github from "../../src/services/github";

jest.mock("../../src/services/github");
const mocked = github as jest.Mocked<typeof github>;

describe("/api/top-langs", () => {
  afterEach(() => jest.clearAllMocks());

  it("returns 400 when username missing", async () => {
    const res = await request(app).get("/api/top-langs");
    expect(res.status).toBe(400);
    expect(res.body).toBeDefined();
  });

  it("returns 200 and svg for valid username", async () => {
    mocked.getUserTopLanguages.mockResolvedValue([{ name: "TypeScript", color: "#3178c6", count: 3 }]);
    const res = await request(app).get("/api/top-langs").query({ username: "octocat" });
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/image\/svg\+xml/);
    expect(Buffer.from(res.body).toString("utf8")).toContain("<svg");
  });
});
