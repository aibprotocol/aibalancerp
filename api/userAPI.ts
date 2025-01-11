// userAPI.ts
/**
 * User Interface API
 * Handles user-facing interactions and data.
 */

import express from "express";

export class UserAPI {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.app.get("/health", (req, res) => {
            res.json({ status: "ok" });
        });

        this.app.post("/task", (req, res) => {
            const { taskName, params } = req.body;
            // Simulate task execution
            res.json({ message: `Task ${taskName} received`, params });
        });
    }

    start(port: number): void {
        this.app.listen(port, () => {
            console.log(`User API is running on port ${port}`);
        });
    }
}
