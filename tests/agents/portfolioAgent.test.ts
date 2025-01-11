// portfolioAgent.test.ts
import { PortfolioAgent } from "../../agents/portfolioAgent";

describe("PortfolioAgent", () => {
    let agent: PortfolioAgent;

    beforeEach(() => {
        agent = new PortfolioAgent();
    });

    test("should add assets to portfolio", () => {
        agent.addAsset("BTC", 1);
        expect(agent.getAsset("BTC")).toBe(1);
    });

    test("should rebalance portfolio", () => {
        agent.addAsset("BTC", 1);
        agent.addAsset("ETH", 1);
        agent.rebalance({ BTC: 0.6, ETH: 0.4 });
        const portfolio = agent.getPortfolio();
        expect(portfolio["BTC"]).toBeCloseTo(1.2);
        expect(portfolio["ETH"]).toBeCloseTo(0.8);
    });
});
