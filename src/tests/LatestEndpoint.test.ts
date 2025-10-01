import { expect } from "chai";
import * as dotenv from "dotenv";
import { latestRates, latestRatesError } from "../types";
import { ExchangeRatesErrorCode } from "../enums";
import apiClient from "../utils/ApiClient";

dotenv.config();

describe("/Latest", () => {
  it("should fetch latest rates with default base (EUR)", async (): Promise<void> => {
    const res = await apiClient<latestRates>("/latest");

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data).to.have.property("rates");
    expect(res.data).to.have.property("base");
    expect(res.data.base).to.equal("EUR");
  });
  it("should fetch latest rates against USD", async (): Promise<void> => {
    const res = await apiClient<latestRates>("/latest", {
      params: { symbols: "USD" },
    });

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data).to.have.property("rates");
    expect(res.data).to.have.property("base");
    expect(res.data.base).to.equal("EUR");
    expect(res.data.rates).to.have.property("USD");
    expect(res.data.rates["USD"]).to.be.a("number");
  });
  it("should fetch latest rates multiple currencies", async (): Promise<void> => {
    const res = await apiClient<latestRates>("/latest", {
      params: { symbols: "USD, GBP" },
    });

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data).to.have.property("rates");
    expect(res.data).to.have.property("base");
    expect(res.data.base).to.equal("EUR");

    expect(Object.keys(res.data.rates)).to.have.length(2);

    expect(res.data.rates).to.have.property("USD");
    expect(res.data.rates["USD"]).to.be.a("number");

    expect(res.data.rates).to.have.property("GBP");
    expect(res.data.rates["GBP"]).to.be.a("number");
  });

  it("should fail with unknown currency", async (): Promise<void> => {
    const res = await apiClient<latestRatesError>("/latest", {
      params: { symbols: "XYZ" },
    });

    expect(res.data.error.code).to.equal(
      ExchangeRatesErrorCode.INVALID_CURRENCY_CODES
    );
    expect(res.data.error.message).to.equal(
      "You have provided one or more invalid Currency Codes. [Required format: currencies=EUR,USD,GBP,...]"
    );
  });
});
