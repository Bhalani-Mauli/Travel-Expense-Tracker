import request from "supertest";

import app from "../../app";

describe("test index routes", () => {
  it("should return mauli", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ name: "Mauli" });
  });
});
