// IRiskManager.ts
/**
 * Interface for Risk Manager
 * Defines the structure and methods required for risk evaluation and management.
 */

export interface IRiskManager {
    evaluateRisk(asset: string, value: number): string;
}
