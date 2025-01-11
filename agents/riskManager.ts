// riskManager.ts

import { Portfolio } from '../utils/helpers';
import { MarketData } from '../api/marketDataAPI';

interface RiskManagerConfig {
    maxDrawdown: number; // Maximum allowable portfolio drawdown (percentage)
    riskThreshold: number; // Threshold for taking risk-reducing actions
}

class RiskManager {
    private portfolio: Portfolio;
    private config: RiskManagerConfig;

    constructor(portfolio: Portfolio, config: RiskManagerConfig) {
        this.portfolio = portfolio;
        this.config = config;
    }

    // Analyze portfolio risk
    async analyzeRisk(): Promise<void> {
        const marketData = await MarketData.fetchLatest();
        console.log('Market data fetched for risk analysis:', marketData);

        const portfolioValue = this.portfolio.totalValue;
        let drawdown = 0;

        this.portfolio.assets.forEach((asset) => {
            const marketInfo = marketData.find((data) => data.symbol === asset.symbol);
            if (marketInfo) {
                const potentialLoss = asset.amount * (marketInfo.price * 0.9); // Simulated 10% drop
                drawdown += potentialLoss;
            }
        });

        const drawdownPercentage = (drawdown / portfolioValue) * 100;

        if (drawdownPercentage > this.config.maxDrawdown) {
            console.log(`Risk alert! Drawdown exceeds max allowed: ${drawdownPercentage}%`);
        } else {
            console.log(`Risk analysis complete. Drawdown: ${drawdownPercentage}%`);
        }
    }

    // Mitigate risk
    async mitigateRisk(): Promise<void> {
        console.log('Mitigating risk...');

        const safeAssets = ['USDT', 'USDC', 'DAI']; // Example of safer assets

        this.portfolio.assets.forEach((asset) => {
            if (!safeAssets.includes(asset.symbol)) {
                console.log(`Reducing exposure to ${asset.symbol}`);
                // Example: Shift a portion to safer assets
            }
        });

        console.log('Risk mitigation actions complete.');
    }

    // Run risk manager
    async run(): Promise<void> {
        console.log('Risk Manager running...');

        setInterval(async () => {
            await this.analyzeRisk();
            await this.mitigateRisk();
        }, 60000); // Run every minute
    }
}

export default RiskManager;
