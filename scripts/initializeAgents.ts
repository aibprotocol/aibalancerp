// initializeAgents.ts
/**
 * Script to initialize agents
 */

import { PortfolioAgent } from "../agents/portfolioAgent";
import { RiskManager } from "../agents/riskManager";
import { OptimizationAgent } from "../agents/optimizationAgent";
import { TaskScheduler } from "../agents/taskScheduler";

async function initializeAgents() {
    console.log("Initializing agents...");

    // Initialize PortfolioAgent
    const portfolioAgent = new PortfolioAgent();
    portfolioAgent.addAsset("BTC", 2);
    portfolioAgent.addAsset("ETH", 10);
    console.log("PortfolioAgent initialized with portfolio:", portfolioAgent.getPortfolio());

    // Initialize RiskManager
    const riskManager = new RiskManager();
    console.log("Risk evaluation for BTC:", riskManager.evaluateRisk("BTC", 15000));

    // Initialize OptimizationAgent
    const optimizationAgent = new OptimizationAgent();
    const optimized = optimizationAgent.optimize({ BTC: 2, ETH: 10 });
    console.log("Optimized allocation:", optimized);

    // Initialize TaskScheduler
    const taskScheduler = new TaskScheduler();
    taskScheduler.addTask("Rebalance Portfolio", () => {
        portfolioAgent.rebalance({ BTC: 0.5, ETH: 0.5 });
        console.log("Rebalanced portfolio:", portfolioAgent.getPortfolio());
    });
    taskScheduler.runTasks();
}

initializeAgents().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
