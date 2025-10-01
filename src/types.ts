export interface latestRates {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  };
}


export interface latestRatesError {
  error: {
    code: string,
    message: string
  }
}