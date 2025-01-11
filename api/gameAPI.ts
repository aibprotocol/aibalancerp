// gameAPI.ts
/**
 * GAME API Integration
 * Provides integration with the GAME SDK.
 */

import { GameAgent, GameWorker, GameFunction, ExecutableGameFunctionResponse, ExecutableGameFunctionStatus } from "@virtuals-protocol/game";

export class GameAPI {
    private agent: GameAgent;

    constructor(apiKey: string) {
        this.agent = new GameAgent(apiKey, {
            name: "Example Agent",
            goal: "Achieve assigned tasks",
            description: "An AI agent powered by GAME SDK",
            workers: [],
        });
    }

    async initialize(): Promise<void> {
        await this.agent.init();
    }

    async executeTask(taskName: string, params: Record<string, any>): Promise<string> {
        const result = await this.agent.runTask(taskName, params);
        return result.status === ExecutableGameFunctionStatus.Done
            ? `Task ${taskName} completed successfully`
            : `Task ${taskName} failed`;
    }
}
