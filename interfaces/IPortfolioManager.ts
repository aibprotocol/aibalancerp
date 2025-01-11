// IPortfolioManager.ts
/**
 * Interface for Portfolio Manager
 * Defines the structure and methods required for portfolio management.
 */

export interface IPortfolioManager {
    addAsset(asset: string, amount: number): void;
    getAsset(asset: string): number;
    getPortfolio(): Record<string, number>;
    rebalance(targetAllocation: Record<string, number>): void;
}
