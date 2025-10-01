import { expect } from "chai";
import * as dotenv from "dotenv";
import { latestRates, latestRatesError } from "../types";
import apiClient from "../utils/ApiClient";

dotenv.config();

describe.skip("/Convert", () => {
  it("should convert EUR to USD", async () => {
    const res = await apiClient<latestRates>("/convert", {
      params: { from: "EUR", to: "USD", amount: 25 },
    });
  });
});
