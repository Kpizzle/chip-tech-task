import { expect } from "chai";
import * as dotenv from "dotenv";
import { latestRates, latestRatesError } from "../types";
import apiClient from "../utils/ApiClient";

dotenv.config();

describe("/Latest", () => {
  it.skip("should fetch latest rates with default base (EUR)", async () => {
    const res = await apiClient<latestRates>("/latest");

    expect(res.status).to.equal(200);
    expect(res.data.success).to.be.true;
    expect(res.data).to.have.property("rates");
    expect(res.data).to.have.property("base");
    expect(res.data.base).to.equal("EUR");
  });
  it.skip("should fetch latest rates against USD", async () => {
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
  it("should fetch latest rates multiple currencies", async () => {
    const res = await apiClient<latestRates>("/latest", {
      params: { symbols: "USD, GBP" },
    });

    console.log(res.data);

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

  it.skip("should fail with unknown currency", async () => {
    const res = await apiClient<latestRatesError>("/latest", {
      params: { symbols: "XYZ" },
    });

    expect(res.data.error.code).to.equal("invalid_currency_code");
    expect(res.data.error.message).to.equal(
      "You have provided one or more invalid Currency Codes. [Required format: currencies=EUR,USD,GBP,...]"
    );
  });
});
