import { expect } from "chai";
import { latestRates, latestRatesError } from "../types";
import apiClient from "../utils/ApiClient";

// This test was abandoned due to the free trail not having access to this
describe.skip("/Convert", () => {
  it("should convert EUR to USD", async () => {
    const res = await apiClient<latestRates>("/convert", {
      params: { from: "EUR", to: "USD", amount: 25 },
    });
  });
});
