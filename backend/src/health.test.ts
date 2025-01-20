import request from "supertest";
import app, { backendSetup } from "./setup/backend.setup";

describe("Express App", () => {
  it('should respond with "It\'s healthy!" for GET /health', async () => {
    await backendSetup();
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    console.log("Response: " + JSON.stringify(response.body));
    expect({ message: "healthy!" }).toEqual(response.body);
  });
});
