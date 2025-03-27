import {
  Result,
  Strategy,
  StrategyRequestInput,
  StrategyResponse,
} from "./types";

const periods = [0, 3, 6, 9, 12];
const arr = (length: number) => Array(length).fill({});

function calculateFee(total: number): { fee: number; feePercent: string } {
  if (total <= 1000)
    return { fee: Number((total * 0.02).toFixed(2)), feePercent: "2%" };
  if (total <= 10000)
    return { fee: Number((total * 0.01).toFixed(2)), feePercent: "1%" };
  if (total <= 35000)
    return { fee: Number((total * 0.005).toFixed(2)), feePercent: "0.5%" };
  if (total > 50000)
    return { fee: Number((total * 0.0025).toFixed(2)), feePercent: "0.25%" };

  return { fee: 0, feePercent: "0%" };
}

function getProfit(capital: number, profitPercent: number): number {
  return capital * (profitPercent / 100);
}

export class SimpleStrategy implements Strategy {
  execute(capital: number, duration: 3 | 6 | 9 | 12): StrategyResponse {
    const percent = periods.indexOf(duration);
    const target = arr(duration);
    const profit = getProfit(capital, percent);
    const results: Result[] = target.map((_, i) => ({
      month: i + 1,
      capital,
      benefits: profit * (i + 1),
      total: capital + profit * (i + 1),
    }));

    const totalBenefits = results[results.length - 1].total;
    const { fee, feePercent } = calculateFee(totalBenefits);
    const totalNet = totalBenefits - fee;

    return {
      results,
      fee,
      feePercent,
      total: totalNet,
    };
  }
}

export class CompoundStrategy implements Strategy {
  execute(capital: number, duration: 3 | 6 | 9 | 12): StrategyResponse {
    const percent = periods.indexOf(duration);
    const target = arr(duration);
    const results = target.reduce((acc, curr, i) => {
      const cap = !!acc.length ? acc[i - 1].month_total : capital;
      const profit = getProfit(cap, percent);
      acc = [
        ...acc,
        {
          month: i + 1,
          capital: cap,
          month_benefits: Number(profit.toFixed(2)),
          month_total: Number((cap + profit).toFixed(2)),
        },
      ];
      return acc;
    }, []);
    const totalBenefits = results[results.length - 1].month_total;
    const { fee, feePercent } = calculateFee(totalBenefits);
    const totalNet = Number((totalBenefits - fee).toFixed(2));

    return {
      results,
      fee,
      feePercent,
      total: totalNet,
    };
  }
}

export class SimulatorContext {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  calculate(capital: number, duration: 3 | 6 | 9 | 12) {
    return this.strategy.execute(capital, duration);
  }
}
