// IOptimization.ts
/**
 * Interface for Optimization
 * Defines the structure and methods required for resource optimization.
 */

export interface IOptimization {
    optimize(resources: Record<string, number>): Record<string, number>;
}
