export interface StrategyRequestInput {
  capital: number;
  duration: 3 | 6 | 9 | 12;
  type: "simple" | "compound";
}

export interface Result {
  month: number;
  capital: number;
  benefits: number;
  total: number;
}

export interface StrategyResponse {
  results: Result[];
  fee: number;
  feePercent: string;
  total: number;
}

export interface Strategy {
  execute(capital: number, profitPercent: number): StrategyResponse;
}
