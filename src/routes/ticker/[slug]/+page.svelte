<script lang="ts">
  import type { PageData } from "./$types";
  import ArrowDown from "virtual:icons/material-symbols/arrow-downward";
  import ArrowUp from "virtual:icons/material-symbols/arrow-upward";

  export let data: PageData;

  const formatPercent = (number?: number): string =>
    number ? (number * 100).toFixed(2) : "";

  const formatPrice = (number?: number): string =>
    number
      ? number.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "";

  let predicted_prices = data.predicted_prices.map((price: any) => {
    return {
      date: new Date(price.date).toLocaleDateString("en-US"),
      price: formatPrice(price.price),
    };
  });

  let ticker = {
    info: {
      symbol: data.ticker?.toUpperCase() ?? "",
      name: data.ticker_info?.shortName ?? "",
      currentPrice: data.ticker_info?.currentPrice,
      website: data.ticker_info?.website ?? "",
      city: data.ticker_info?.city ?? "",
      state: data.ticker_info?.state ?? "",
      employees:
        data.ticker_info?.fullTimeEmployees?.toLocaleString("en-US") ?? "",
      sector: data.ticker_info?.sectorDisp ?? "",
    },

    analysis: {
      recommendation: data.ticker_info?.recommendationKey?.toUpperCase() ?? "",
      debtToEquity: data.ticker_info?.debtToEquity ?? "",
      freeCashFlow: formatPrice(data.ticker_info?.freeCashflow),
      ebitda: formatPrice(data.ticker_info?.ebitda),
      shortRatio: data.ticker_info?.shortRatio ?? "",
      shortFloat: formatPercent(data.ticker_info?.shortPercentOfFloata ?? 0),
      beta: data.ticker_info?.beta ?? "",
      trailingEps: formatPrice(data.ticker_info?.trailingEps),
      forwardEps: formatPrice(data.ticker_info?.forwardEps),
    },

    performance: {
      currentPrice: data.ticker_info?.currentPrice,
      yesterdaysClose: data.ticker_info?.previousClose,
      marketCap: formatPrice(data.ticker_info?.marketCap),
      volume: formatPrice(data.ticker_info?.volume),
      open: formatPrice(data.ticker_info?.open),
      low: formatPrice(data.ticker_info?.dayLow),
      high: formatPrice(data.ticker_info?.dayHigh),
      fiftyTwoWeekHigh: formatPrice(data.ticker_info?.fiftyTwoWeekHigh),
      fiftyTwoWeekLow: formatPrice(data.ticker_info?.fiftyTwoWeekLow),
    },

    sentiment: {
      floatShares: formatPrice(data.ticker_info?.floatShares),
      sharesOutstanding: formatPrice(data.ticker_info?.sharesOutstanding),
      sharesShort: formatPrice(data.ticker_info?.sharesShort),
      sharesShortPriorMonth: formatPrice(
        data.ticker_info?.sharesShortPriorMonth
      ),
      shortPercent: formatPercent(data.ticker_info?.shortPercentOfFloat),
      shortRatio: data.ticker_info?.shortRatio,
    },
  };
</script>

<div class="">
  {#if !data}
    <div>Loading...</div>
  {:else}
    <div class="flex flex-col gap-5">
      <div class="flex flex-col">
        <div class="flex items-start gap-2">
          <div class="flex items-center gap-5 text-5xl sm:text-7xl uppercase">
            <div>
              {ticker.info.symbol}
            </div>

            {#if ticker.performance.currentPrice > ticker.performance.yesterdaysClose}
              {#if ticker.info.currentPrice}
                <div
                  class="badge badge-primary h-full px-4 py-2 text-xl sm:text-3xl font-bold text-primary-content"
                >
                  {ticker.info.currentPrice}
                  <ArrowUp
                    class="h-7 w-7 sm:h-10 sm:w-10 text-primary-content"
                  />
                </div>
              {/if}
            {:else if ticker.info.currentPrice}
              <div
                class="badge badge-error h-full px-4 py-2 text-xl sm:text-3xl font-bold text-error-content"
              >
                {ticker.info.currentPrice}
                <ArrowDown class="h-7 w-7 sm:h-10 sm:w-10 text-error-content" />
              </div>
            {/if}
          </div>
        </div>

        <div class="text-xl font-thin uppercase">{ticker.info.name}</div>

        <div class="flex flex-col gap-5 text-sm font-thin">
          <div class="">
            {#if ticker.info.website}
              <div>
                <span class="font-semibold">Website:</span>
                <a href={ticker.info.website} target="_blank"
                  >{ticker.info.website}</a
                >
              </div>
            {/if}

            {#if ticker.info.city}
              <div>
                <span class="font-semibold">Location:</span>
                {ticker.info.city}, {ticker.info.state}
              </div>
            {/if}

            {#if ticker.info.employees}
              <div>
                <span class="font-semibold">Employees:</span>
                {ticker.info.employees}
              </div>
            {/if}

            {#if ticker.info.sector}
              <div>
                <span class="font-semibold">Sector:</span>
                {ticker.info.sector}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <div class="">
        <div class="font-semibold">Performance Data:</div>
        <div class="flex gap-2 overflow-auto">
          {#each Object.entries(ticker) as [key, value]}
            {#if key !== "info" && key !== "analysis"}
              {#if value && Object.values(value).some((x) => x)}
                <div class="rounded bg-accent p-6 text-sm text-accent-content">
                  {#each Object.entries(value) as [prop, propValue]}
                    {#if propValue}
                      <div class="flex gap-2">
                        <div class="font-semibold capitalize">{prop}:</div>
                        <div class="">{propValue}</div>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            {/if}
          {/each}
        </div>
      </div>

      <div class="">
        <div class="font-semibold">Analysis Data:</div>
        <div class="flex gap-2 overflow-auto">
          {#each Object.entries(ticker.analysis) as [key, value]}
            {#if value}
              <div class="rounded bg-secondary p-6 text-secondary-content">
                <div class="flex flex-col items-center justify-center gap-2">
                  <div class="font-thin capitalize">{key}:</div>
                  <div class="text-xl font-semibold uppercase">{value}</div>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>

      <div class="">
        <div class="font-semibold">30 AI Day Forecast:</div>
        <div class="flex gap-2 overflow-auto">
          {#each predicted_prices as price}
            <div
              class="rounded bg-primary p-6 text-center text-primary-content"
            >
              <div class="flex flex-col items-center justify-center gap-2">
                <div class="w-full text-nowrap text-sm font-thin">
                  {price.date}
                </div>
                <div class="text-xl font-semibold uppercase">{price.price}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      {#if data.ticker_info.longBusinessSummary}
        <div>
          <div class="font-semibold">Description:</div>
          <div>{data.ticker_info.longBusinessSummary}</div>
        </div>
      {/if}
    </div>
    <a class="btn btn-primary my-5" href={ticker.info.website} target="_blank"
      >Learn More</a
    >

    <div class="my-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {#each predicted_prices as price}
        <div class="rounded bg-base-300 p-2">
          <div class="w-full">{price.date}</div>
          <div class="w-full">{price.price}</div>
        </div>
      {/each}
    </div>
  {/if}
</div>
