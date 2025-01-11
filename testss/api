// userAPI.test.ts
import request from "supertest";
import { UserAPI } from "../../api/userAPI";

describe("UserAPI", () => {
    let api: UserAPI;

    beforeAll(() => {
        api = new UserAPI();
        api.start(3000);
    });

    afterAll(() => {
        process.exit(); // Close the server after tests
    });

    test("should respond to health check", async () => {
        const response = await request("http://localhost:3000").get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
    });

    test("should handle task requests", async () => {
        const response = await request("http://localhost:3000")
            .post("/task")
            .send({ taskName: "testTask", params: { key: "value" } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Task testTask received");
    });
});
