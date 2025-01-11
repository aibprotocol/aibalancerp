// portfolioAgent.ts

import { MarketData } from '../api/marketDataAPI';
import { Portfolio } from '../utils/helpers';

interface PortfolioAgentConfig {
    maxAssets: number;
    riskTolerance: number;
    rebalanceFrequency: number; // in seconds
}

class PortfolioAgent {
    private portfolio: Portfolio;
    private config: PortfolioAgentConfig;

    constructor(portfolio: Portfolio, config: PortfolioAgentConfig) {
        this.portfolio = portfolio;
        this.config = config;
    }

    // Fetch market data and evaluate portfolio
    async evaluatePortfolio(): Promise<void> {
        const marketData = await MarketData.fetchLatest();
        console.log('Market data fetched:', marketData);

        // Evaluate portfolio based on market data
        this.portfolio.assets.forEach((asset) => {
            const marketInfo = marketData.find((data) => data.symbol === asset.symbol);
            if (marketInfo) {
                asset.value = asset.amount * marketInfo.price;
            }
        });

        console.log('Portfolio evaluation complete:', this.portfolio);
    }

    // Rebalance portfolio
    async rebalancePortfolio(): Promise<void> {
        console.log('Rebalancing portfolio...');

        const targetAllocation = 1 / this.config.maxAssets;
        this.portfolio.assets.forEach((asset) => {
            const currentAllocation = asset.value / this.portfolio.totalValue;
            const adjustment = targetAllocation - currentAllocation;

            if (adjustment > 0) {
                console.log(`Buying ${adjustment * 100}% more of ${asset.symbol}`);
            } else {
                console.log(`Selling ${Math.abs(adjustment * 100)}% of ${asset.symbol}`);
            }
        });

        console.log('Rebalance complete.');
    }

    // Run the portfolio agent
    async run(): Promise<void> {
        console.log('Portfolio Agent running...');

        setInterval(async () => {
            await this.evaluatePortfolio();
            await this.rebalancePortfolio();
        }, this.config.rebalanceFrequency * 1000);
    }
}

export default PortfolioAgent;
