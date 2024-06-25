import { z as create_anchor, F as spread_attributes, B as pop, G as sanitize_props, y as push, A as bind_props, H as ensure_array_like, I as attr, J as store_get, T as escape, K as unsubscribe_stores, W as store_set, O as value_or_fallback, L as stringify } from "../../../../chunks/index3.js";
import { w as writable } from "../../../../chunks/index2.js";
import "chart.js/auto";
import daisyuiColors from "daisyui/src/theming/themes.js";
import "../../../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const selectedTheme = writable("dim");
const prefferedTimeframe = writable(180);
const getTimeframe = (days) => {
  if (days < 0) {
    return "Invalid timeframe";
  } else if (days < 30) {
    return `${days}d${days !== 1 ? "" : ""}`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months}m${months !== 1 ? "" : ""}`;
  } else {
    const years = Math.floor(days / 365);
    return `${years}y${years !== 1 ? "" : ""}`;
  }
};
const calculatePercentageChange = (previousValue, currentValue) => {
  const difference = currentValue - previousValue;
  const percentageChange = difference / Math.abs(previousValue) * 100;
  return percentageChange;
};
const convertDate = (timestampInSeconds) => {
  const date = new Date(timestampInSeconds * 1e3);
  return date.toLocaleString();
};
const prettifyDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
};
const formatPercent = (number) => number ? (number * 100).toFixed(2) : "";
const formatPrice = (number) => number ? number.toLocaleString("en-US", { style: "currency", currency: "USD" }) : "";
const camelCaseToRegular = (camelCaseString) => {
  return camelCaseString.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, function(str) {
    return str.toUpperCase();
  });
};
const calculatePricePercentage = (high, low, currentPrice) => {
  if (high <= low || currentPrice < low || currentPrice > high) {
    throw new Error(
      "Invalid input. Ensure 52-week high is greater than 52-week low, and current price is within the range."
    );
  }
  const priceRange = high - low;
  const priceAboveLow = currentPrice - low;
  const percentage = priceAboveLow / priceRange * 100;
  return {
    high: Number(high),
    low: Number(low),
    percentage: Number(percentage)
  };
};
function generateTicker(data) {
  return {
    info: {
      symbol: data.ticker?.toUpperCase() ?? "",
      name: data.ticker_info?.shortName ?? "",
      currentPrice: formatPrice(data.ticker_info?.currentPrice),
      website: data.ticker_info?.website ?? "",
      city: data.ticker_info?.city ?? "",
      state: data.ticker_info?.state ?? "",
      employees: data.ticker_info?.fullTimeEmployees?.toLocaleString("en-US") ?? "",
      sector: data.ticker_info?.sectorDisp ?? ""
    },
    analysis: {
      recommendation: data.ticker_info?.recommendationKey?.toUpperCase() ?? "",
      debtToEquity: data.ticker_info?.debtToEquity ?? "",
      freeCashFlow: formatPrice(data.ticker_info?.freeCashflow),
      ebitda: formatPrice(data.ticker_info?.ebitda),
      shortFloat: formatPercent(data.ticker_info?.shortPercentOfFloata ?? 0),
      beta: data.ticker_info?.beta ?? "",
      trailingEps: formatPrice(data.ticker_info?.trailingEps),
      forwardEps: formatPrice(data.ticker_info?.forwardEps)
    },
    performance: {
      currentPrice: formatPrice(data.ticker_info?.currentPrice),
      yesterdaysClose: formatPrice(data.ticker_info?.previousClose),
      volume: formatPrice(data.ticker_info?.volume),
      open: formatPrice(data.ticker_info?.open),
      low: formatPrice(data.ticker_info?.dayLow),
      high: formatPrice(data.ticker_info?.dayHigh),
      fiftyTwoWeekHigh: formatPrice(data.ticker_info?.fiftyTwoWeekHigh),
      fiftyTwoWeekLow: formatPrice(data.ticker_info?.fiftyTwoWeekLow),
      fiftyTwoWeekRange: calculatePricePercentage(
        data.ticker_info?.fiftyTwoWeekHigh,
        data.ticker_info?.fiftyTwoWeekLow,
        data.ticker_info?.currentPrice
      )
    },
    financials: {
      marketCap: formatPrice(data.ticker_info?.marketCap),
      revenue: formatPrice(data.ticker_info?.revenue),
      grossProfit: formatPrice(data.ticker_info?.grossProfit),
      profitMargin: data.ticker_info?.profitMargins,
      operatingIncome: formatPrice(data.ticker_info?.operatingIncome),
      netIncome: formatPrice(data.ticker_info?.netIncome),
      totalAssets: formatPrice(data.ticker_info?.totalAssets),
      totalLiabilities: formatPrice(data.ticker_info?.totalLiab),
      totalDebt: formatPrice(data.ticker_info?.totalDebt),
      currentRatio: data.ticker_info?.currentRatio,
      quickRatio: data.ticker_info?.quickRatio,
      operatingCashFlow: formatPrice(data.ticker_info?.operatingCashflow),
      leveredFreeCashFlow: formatPrice(data.ticker_info?.leveredFreeCashflow),
      dividentYield: data.ticker_info?.dividendYield,
      payoutRatio: data.ticker_info?.payoutRatio,
      trailingPE: data.ticker_info?.trailingPE,
      forwardPE: data.ticker_info?.forwardPE,
      enterpriseValue: formatPrice(data.ticker_info?.enterpriseValue)
    },
    short: {
      floatShares: formatPrice(data.ticker_info?.floatShares),
      sharesOutstanding: formatPrice(data.ticker_info?.sharesOutstanding),
      sharesShort: formatPrice(data.ticker_info?.sharesShort),
      sharesShortPriorMonth: formatPrice(data.ticker_info?.sharesShortPriorMonth),
      // shortPercent: formatPercent(data.ticker_info?.shortPercentOfFloat) + '%',
      shortPercent: data.ticker_info?.shortPercentOfFloat !== null && data.ticker_info?.shortPercentOfFloat !== void 0 ? formatPercent(data.ticker_info.shortPercentOfFloat) + "%" : void 0,
      // or '' depending on what you want for undefined cases
      shortRatio: data.ticker_info?.shortRatio
    }
  };
}
function Arrow_upward($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M11 20V7.825l-5.6 5.6L4 12l8-8l8 8l-1.4 1.425l-5.6-5.6V20z"/>${anchor}</svg>`;
  pop();
}
function Arrow_downward($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M11 4v12.175l-5.6-5.6L4 12l8 8l8-8l-1.4-1.425l-5.6 5.6V4z"/>${anchor}</svg>`;
  pop();
}
function Chart($$payload, $$props) {
  push(false);
  let chartTitle = $$props["chartTitle"];
  let chartValues = $$props["chartValues"];
  let chartLabels = $$props["chartLabels"];
  let currentTheme;
  selectedTheme.subscribe((value) => {
    currentTheme = value;
    updateChartColor();
  });
  function updateChartColor() {
    if (!currentTheme)
      return;
    Object.entries(daisyuiColors).forEach(([key, value]) => {
      if (key == currentTheme) {
        value.primary;
      }
    });
  }
  $$payload.out += `<canvas id="myChart"></canvas>`;
  bind_props($$props, { chartTitle, chartValues, chartLabels });
  pop();
}
function ChartWithButtons($$payload, $$props) {
  push(false);
  var $$store_subs;
  let chartTitle = $$props["chartTitle"];
  let chartLabels = $$props["chartLabels"];
  let chartValues = $$props["chartValues"];
  let data = $$props["data"];
  let timeframeOptions = [
    5,
    10,
    30,
    90,
    180,
    365,
    730,
    1095,
    1825
  ];
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(timeframeOptions);
  const anchor_3 = create_anchor($$payload);
  const each_array_1 = ensure_array_like(timeframeOptions);
  $$payload.out += `<div><div class="flex gap-1 overflow-auto py-2">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const option = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}${anchor_2}`;
    if (Number(option) < Number(data.price_history.length)) {
      $$payload.out += "<!--ssr:if:true-->";
      $$payload.out += `<button${attr("class", store_get($$store_subs ??= {}, "$prefferedTimeframe", prefferedTimeframe) === option ? "btn btn-sm btn-primary" : "btn btn-sm btn-outline", false)}>${escape(getTimeframe(option))}</button>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
    }
    $$payload.out += `${anchor_2}${anchor_1}`;
  }
  $$payload.out += `${anchor}</div> <div>${anchor_3}`;
  for (let $$index_1 = 0; $$index_1 < each_array_1.length; $$index_1++) {
    const option = each_array_1[$$index_1];
    const anchor_4 = create_anchor($$payload);
    const anchor_5 = create_anchor($$payload);
    $$payload.out += `${anchor_4}${anchor_5}`;
    if (store_get($$store_subs ??= {}, "$prefferedTimeframe", prefferedTimeframe) == option) {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_6 = create_anchor($$payload);
      $$payload.out += `<div class="h-60 sm:h-80">${anchor_6}`;
      Chart($$payload, {
        chartLabels: data.price_history.slice(-option).map((date) => prettifyDate(date["Date"])),
        chartValues: data.price_history.slice(-option).map((price) => price["Close"]),
        chartTitle
      });
      $$payload.out += `${anchor_6}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
    }
    $$payload.out += `${anchor_5}${anchor_4}`;
  }
  $$payload.out += `${anchor_3}</div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { chartTitle, chartLabels, chartValues, data });
  pop();
}
function TickerHeading($$payload, $$props) {
  push(false);
  var $$store_subs;
  prefferedTimeframe.subscribe((value) => {
    store_set(prefferedTimeframe, value);
  });
  let data = $$props["data"];
  let ticker = $$props["ticker"];
  let timeframes = [
    5,
    10,
    30,
    90,
    180,
    365,
    730,
    1095,
    1825
  ];
  const isBullish = (previous, current) => {
    if (previous && current) {
      return Number(previous) < Number(current);
    }
  };
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(timeframes);
  const anchor_7 = create_anchor($$payload);
  const anchor_8 = create_anchor($$payload);
  const anchor_9 = create_anchor($$payload);
  const anchor_10 = create_anchor($$payload);
  const anchor_11 = create_anchor($$payload);
  $$payload.out += `<div class="flex flex-col"><div class="text-xs font-thin sm:text-sm">${escape((/* @__PURE__ */ new Date()).toLocaleDateString("en-US"))}</div> <div class="pb-2"><div class="flex items-center gap-5"><div class="font-sans text-5xl font-thin sm:text-7xl">${escape(ticker.info.symbol)}</div> <div>${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const timeframe = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}${anchor_2}`;
    if (timeframe == store_get($$store_subs ??= {}, "$prefferedTimeframe", prefferedTimeframe) && data.price_history.length > store_get($$store_subs ??= {}, "$prefferedTimeframe", prefferedTimeframe)) {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_3 = create_anchor($$payload);
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `<div class="flex items-center gap-2"><div class="badge badge-primary text-primary-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-3xl">${anchor_3}`;
      if (ticker.info.currentPrice) {
        $$payload.out += "<!--ssr:if:true-->";
        $$payload.out += `<div>${escape(ticker.info.currentPrice)}</div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
        $$payload.out += `<div>${escape(formatPrice(data.price_history.slice(-1)[0]["Close"]))}</div>`;
      }
      $$payload.out += `${anchor_3}</div> ${anchor_4}`;
      if (isBullish(data.price_history.slice(-timeframe)[0]["Close"], data.price_history.slice(-timeframe)[timeframe - 1]["Close"])) {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_5 = create_anchor($$payload);
        $$payload.out += `<div class="badge badge-success text-success-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-3xl"><div>${anchor_5}`;
        Arrow_upward($$payload, {
          class: "text-success-content h-5 w-5 animate-pulse sm:h-7 sm:w-7"
        });
        $$payload.out += `${anchor_5}</div> <div>${escape(calculatePercentageChange(Number(data.price_history.slice(-timeframe)[0]["Close"]), Number(data.price_history.slice(-timeframe)[timeframe - 1]["Close"])).toFixed(2) + "%")}</div></div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
        const anchor_6 = create_anchor($$payload);
        $$payload.out += `<div class="badge badge-error text-error-content flex h-full items-center gap-1 px-2 py-1 text-lg font-semibold sm:text-3xl"><div>${anchor_6}`;
        Arrow_downward($$payload, {
          class: "text-error-content h-5 w-5 animate-pulse sm:h-7 sm:w-7"
        });
        $$payload.out += `${anchor_6}</div> <div>${escape(calculatePercentageChange(Number(data.price_history.slice(-timeframe)[0]["Close"]), Number(data.price_history.slice(-timeframe)[timeframe - 1]["Close"])).toFixed(2) + "%")}</div></div>`;
      }
      $$payload.out += `${anchor_4}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
    }
    $$payload.out += `${anchor_2}${anchor_1}`;
  }
  $$payload.out += `${anchor}</div></div></div> <div class="text-xl font-thin uppercase">${escape(ticker.info.name)}</div> <div class="flex flex-col gap-5 text-sm font-thin"><div>${anchor_7}`;
  if (ticker.info.website) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div><span class="font-semibold">Website:</span> <a${attr("href", ticker.info.website, false)} target="_blank">${escape(ticker.info.website)}</a></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_7} ${anchor_8}`;
  if (ticker.info.city) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div><span class="font-semibold">Location:</span> ${escape(ticker.info.city)}, ${escape(ticker.info.state)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_8} ${anchor_9}`;
  if (ticker.info.employees) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div><span class="font-semibold">Employees:</span> ${escape(ticker.info.employees)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_9} ${anchor_10}`;
  if (ticker.info.sector) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div><span class="font-semibold">Sector:</span> ${escape(ticker.info.sector)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_10}</div></div> <div class="mb-10 h-52 sm:h-80">${anchor_11}`;
  ChartWithButtons($$payload, {
    chartTitle: "Price History",
    chartLabels: data.price_history.map((date) => date["Date"]),
    chartValues: data.price_history.map((price) => price["Close"]),
    data
  });
  $$payload.out += `${anchor_11}</div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { data, ticker });
  pop();
}
function AnalystData($$payload, $$props) {
  push(false);
  let ticker = $$props["ticker"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (ticker.analysis.recommendation != "") {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(Object.entries(ticker.analysis));
    $$payload.out += `<div><div class="flex items-center gap-2"><div class="text-3xl font-semibold">Analyst Data</div></div> <div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const $$item = each_array[$$index];
      const [key, value] = $$item;
      const anchor_2 = create_anchor($$payload);
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_2}${anchor_3}`;
      if (value) {
        $$payload.out += "<!--ssr:if:true-->";
        $$payload.out += `<div class="bg-primary text-primary-content snap-center text-nowrap rounded"><div class="flex h-full w-full flex-col items-center justify-center gap-2 p-6"><div class="flex whitespace-nowrap font-thin capitalize">${escape(camelCaseToRegular(key))}:</div> <div class="text-nowrap text-xl font-semibold uppercase">${escape(value)}</div></div></div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
      }
      $$payload.out += `${anchor_3}${anchor_2}`;
    }
    $$payload.out += `${anchor_1}</div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { ticker });
  pop();
}
function CompanyData($$payload, $$props) {
  push(false);
  let ticker = $$props["ticker"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (ticker.analysis.recommendation !== "") {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(Object.entries(ticker));
    $$payload.out += `<div class="flex snap-x snap-mandatory flex-nowrap gap-2 overflow-auto text-nowrap">${anchor_1}`;
    for (let $$index_1 = 0; $$index_1 < each_array.length; $$index_1++) {
      const $$item = each_array[$$index_1];
      const [key, value] = $$item;
      const anchor_2 = create_anchor($$payload);
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_2}${anchor_3}`;
      if (key !== "info" && key !== "analysis" && value && Object.values(value).some((x) => x)) {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_4 = create_anchor($$payload);
        const each_array_1 = ensure_array_like(Object.entries(value));
        $$payload.out += `<div class="flex flex-col gap-2 rounded pb-5"><div class="snap-center pb-3 text-3xl font-semibold capitalize">${escape(key)}</div> ${anchor_4}`;
        for (let $$index = 0; $$index < each_array_1.length; $$index++) {
          const $$item2 = each_array_1[$$index];
          const [prop, propValue] = $$item2;
          const anchor_5 = create_anchor($$payload);
          const anchor_6 = create_anchor($$payload);
          $$payload.out += `${anchor_5}${anchor_6}`;
          if (propValue) {
            $$payload.out += "<!--ssr:if:true-->";
            const anchor_7 = create_anchor($$payload);
            $$payload.out += `<div class="bg-primary text-primary-content rounded p-2"><div class="flex gap-2"><div class="flex w-full justify-between gap-5"><div class="w-full whitespace-nowrap font-semibold capitalize">${escape(prop === "fiftyTwoWeekRange" ? `${camelCaseToRegular(prop)}: ${propValue.percentage.toFixed(0)}%` : camelCaseToRegular(prop))}:</div> <div>${escape(prop === "fiftyTwoWeekRange" ? null : propValue)}</div></div></div> ${anchor_7}`;
            if (prop === "fiftyTwoWeekRange") {
              $$payload.out += "<!--ssr:if:true-->";
              $$payload.out += `<div class="flex items-center gap-1"><div class="text-xs">${escape(formatPrice(propValue.low))}</div> <progress class="progress progress-warning border-warning h-3 w-full min-w-32 border"${attr("value", propValue.percentage, false)} max="100"></progress> <div class="text-xs">${escape(formatPrice(propValue.high))}</div></div>`;
            } else {
              $$payload.out += "<!--ssr:if:false-->";
            }
            $$payload.out += `${anchor_7}</div>`;
          } else {
            $$payload.out += "<!--ssr:if:false-->";
          }
          $$payload.out += `${anchor_6}${anchor_5}`;
        }
        $$payload.out += `${anchor_4}</div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
      }
      $$payload.out += `${anchor_3}${anchor_2}`;
    }
    $$payload.out += `${anchor_1}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { ticker });
  pop();
}
function Ibm_watson_machine_learning($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 32 32" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M3.6 22.5c-1-2-1.6-4.2-1.6-6.5C2 8.3 8.3 2 16 2v2C9.4 4 4 9.4 4 16c0 2 .5 3.8 1.4 5.5zM28 16c0 6.6-5.4 12-12 12c-2.9 0-5.6-1-7.7-2.8l5.7-5.7l-1.4-1.5l-6.5 6.5c-.4.4-.4 1 0 1.4C8.7 28.5 12.3 30 16 30c7.7 0 14-6.3 14-14z"/><path fill="currentColor" d="M18 25c-.1 0-.3 0-.4-.1c-.3-.1-.6-.4-.6-.8l-.7-5l2-.3l.4 3.3l2.2-1.7V15c0-.3.1-.5.3-.7l3.2-3.2c.9-.9 1.5-2.2 1.5-3.5V6h-1.5c-1.3 0-2.6.5-3.5 1.5l-3.2 3.2c-.2.2-.4.3-.7.3h-5.5l-1.7 2.2l3.3.4l-.3 2l-5-.7c-.4 0-.7-.3-.8-.6s-.1-.7.1-1l3-4c.3-.2.6-.3.9-.3h5.6l3-3c1.3-1.3 3.1-2 4.9-2H26c1.1 0 2 .9 2 2v1.5c0 1.9-.7 3.6-2 4.9l-3 3V21c0 .3-.1.6-.4.8l-4 3c-.2.1-.4.2-.6.2"/>${anchor}</svg>`;
  pop();
}
function CompanyDescription($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  let ticker = $$props["ticker"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (data.ticker_info.longBusinessSummary) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `<div><div class="flex items-center gap-2"><div class="text-3xl font-semibold">Description</div></div> <div class="py-5">${escape(data.ticker_info.longBusinessSummary)}</div> <a class="btn btn-primary"${attr("href", ticker.info.website, false)} target="_blank"><div class="flex items-center gap-1"><div>Learn More</div> ${anchor_1}`;
    Ibm_watson_machine_learning($$payload, { class: " h-7 w-7" });
    $$payload.out += `${anchor_1}</div></a></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { data, ticker });
  pop();
}
function Money_outline($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 15 15" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="none" stroke="currentColor" d="M11 10.5h1.5V9M11 4.5h1.5V6M4 4.5H2.5V6m0 3v1.5H4m3.5-1a2 2 0 1 1 0-4a2 2 0 0 1 0 4Zm-6-7h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"/>${anchor}</svg>`;
  pop();
}
function CompanyOfficerCard($$payload, $$props) {
  push(false);
  let companyOfficers = value_or_fallback($$props["companyOfficers"], {
    name: "",
    title: "",
    age: "",
    fiscalYear: "",
    totalPay: "",
    exercisedValue: "",
    unexercisedValue: ""
  });
  const anchor = create_anchor($$payload);
  $$payload.out += `<a${attr("href", `https://www.google.com/search?q=${companyOfficers.name}`, false)}${attr("target", `_blank`, false)} class="bg-primary text-primary-content w-full snap-center rounded p-6"><div class="flex w-full flex-col items-center justify-start gap-2"><div class="w-full text-nowrap text-lg font-thin capitalize">${escape(companyOfficers.name)}</div> <div class="w-full font-semibold uppercase">${escape(companyOfficers.title)}</div> <div class="w-full">${anchor}`;
  if (companyOfficers.totalPay) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `<div class="flex items-center gap-2 text-sm"><div>${anchor_1}`;
    Money_outline($$payload, { class: "h-5 w-5" });
    $$payload.out += `${anchor_1}</div> <div><div class="flex items-center">${escape(formatPrice(Number(companyOfficers.totalPay)))} <div>/yr</div></div></div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}</div></div></a>`;
  bind_props($$props, { companyOfficers });
  pop();
}
function CompanyOfficers($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  let companyOfficers = $$props["companyOfficers"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (data.ticker_info.companyOfficers) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(companyOfficers);
    $$payload.out += `<div><div class="flex items-center gap-2"><div class="text-3xl font-semibold">Company Officers</div></div> <div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const officer = each_array[$$index];
      const anchor_2 = create_anchor($$payload);
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_2}${anchor_3}`;
      CompanyOfficerCard($$payload, { companyOfficers: officer });
      $$payload.out += `${anchor_3}${anchor_2}`;
    }
    $$payload.out += `${anchor_1}</div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { data, companyOfficers });
  pop();
}
function AiForecast($$payload, $$props) {
  push(false);
  let predicted_prices = value_or_fallback($$props["predicted_prices"], []);
  let onlyPrices = value_or_fallback($$props["onlyPrices"], []);
  let onlyDates = value_or_fallback($$props["onlyDates"], []);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (predicted_prices.length > 0) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(predicted_prices);
    const anchor_3 = create_anchor($$payload);
    const anchor_6 = create_anchor($$payload);
    const anchor_7 = create_anchor($$payload);
    $$payload.out += `<div><div class="flex items-center gap-2"><div class="text-3xl font-semibold">30 day AI Forecast</div></div> <div class="flex snap-x snap-mandatory gap-2 overflow-auto py-5">${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const price = each_array[$$index];
      const anchor_2 = create_anchor($$payload);
      $$payload.out += `${anchor_2}<div class="bg-primary text-primary-content snap-center rounded p-6 text-center"><div class="flex flex-col items-center justify-center gap-2"><div class="w-full text-nowrap text-sm font-thin">${escape(price.date)}</div> <div class="text-xl font-semibold uppercase">${escape(price.price)}</div></div></div>${anchor_2}`;
    }
    $$payload.out += `${anchor_1}</div> <div class="pt-2">${anchor_3}`;
    if (parseFloat(predicted_prices[0].price.replace("$", "")) > parseFloat(predicted_prices[predicted_prices.length - 1].price.replace("$", ""))) {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `<div class="badge badge-error text-error-content h-full px-4 py-2 text-sm font-bold">Bearish ${anchor_4}`;
      Arrow_downward($$payload, { class: "text-error-content h-5 w-5" });
      $$payload.out += `${anchor_4}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_5 = create_anchor($$payload);
      $$payload.out += `<div class="badge badge-success text-success-content h-full px-4 py-2 text-sm font-bold">Bullish ${anchor_5}`;
      Arrow_upward($$payload, { class: "text-success-content h-5 w-5" });
      $$payload.out += `${anchor_5}</div>`;
    }
    $$payload.out += `${anchor_3} ${anchor_6}`;
    if (parseFloat(predicted_prices[0].price.replace("$", "")) > parseFloat(predicted_prices[predicted_prices.length - 1].price.replace("$", ""))) {
      $$payload.out += "<!--ssr:if:true-->";
      $$payload.out += `<div class="badge badge-error text-error-content h-full px-4 py-2 text-sm font-bold">${escape(calculatePercentageChange(Number(predicted_prices[0].price.replace("$", "")), Number(predicted_prices[predicted_prices.length - 1].price.replace("$", ""))).toFixed(2) + "%")}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      $$payload.out += `<div class="badge badge-success text-success-content h-full px-4 py-2 text-sm font-bold">${escape(calculatePercentageChange(Number(predicted_prices[0].price.replace("$", "")), Number(predicted_prices[predicted_prices.length - 1].price.replace("$", ""))).toFixed(2) + "%")}</div>`;
    }
    $$payload.out += `${anchor_6} <div class="h-52 pt-2 sm:h-72">${anchor_7}`;
    Chart($$payload, {
      chartTitle: "Projected Prices",
      chartValues: onlyPrices,
      chartLabels: onlyDates
    });
    $$payload.out += `${anchor_7}</div></div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<div class="flex items-center gap-2"><div class="animate-pulse text-3xl font-semibold">Generating AI Response</div> <span class="loading loading-spinner text-primary"></span></div>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { predicted_prices, onlyPrices, onlyDates });
  pop();
}
function NewsItem($$payload, $$props) {
  push(false);
  let newsItem = value_or_fallback($$props["newsItem"], {
    title: "Title",
    publisher: "Publisher",
    link: "https://www.example.com",
    thumbnail: {
      resolutions: [
        { url: "https://www.example.com/image.jpg" },
        { url: "https://www.example.com/image.jpg" }
      ]
    },
    relatedTickers: ["AAPL", "GOOGL"],
    providerPublishTime: 191939393
  });
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const each_array = ensure_array_like(newsItem.relatedTickers);
  $$payload.out += `<div class="group relative h-72 w-full min-w-80 rounded"><a${attr("href", newsItem.link, false)} target="_blank" class="bg-primary group w-full"><div class="relative h-72 w-full">${anchor}`;
  if (newsItem.thumbnail?.resolutions[0].url) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<img class="border-primary h-full w-full rounded border object-cover opacity-100 saturate-150"${attr("src", newsItem.thumbnail.resolutions[0].url, false)}${attr("alt", newsItem.title, false)}>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <div class="bg-primary absolute left-0 top-0 h-full w-full rounded opacity-70 transition-all duration-300 sm:group-hover:opacity-80"></div> <div class="text-secondary-content absolute bottom-0 z-20 flex w-80 flex-col p-6 drop-shadow"><div class="line-clamp-5 h-full w-full text-3xl font-semibold">${escape(newsItem.title)}</div> <div class="w-full font-thin">${escape(newsItem.publisher)}</div> <div class="w-full text-xs">${escape(convertDate(newsItem.providerPublishTime))}</div> <div class="flex w-full flex-wrap gap-1 pt-2 text-xs">${anchor_1}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const tickerTag = each_array[$$index];
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}<div class="badge badge-sm badge-primary flex-shrink-0 text-xs shadow">${escape(tickerTag)}</div>${anchor_2}`;
  }
  $$payload.out += `${anchor_1}</div></div></div></a></div>`;
  bind_props($$props, { newsItem });
  pop();
}
function NewsFeed($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  let ticker = $$props["ticker"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (data.news) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    const each_array = ensure_array_like(data.news);
    $$payload.out += `<div><div class="text-3xl font-semibold"><div class="flex items-center gap-2"><span class="uppercase">${escape(ticker.info.symbol)}</span> News</div></div> <div class="flex w-full snap-x snap-mandatory gap-2 overflow-auto py-5">${anchor_1}`;
    for (let $$index = 0; $$index < each_array.length; $$index++) {
      const newsItem = each_array[$$index];
      const anchor_2 = create_anchor($$payload);
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_2}<div class="snap-center">${anchor_3}`;
      NewsItem($$payload, { newsItem });
      $$payload.out += `${anchor_3}</div>${anchor_2}`;
    }
    $$payload.out += `${anchor_1}</div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { data, ticker });
  pop();
}
function Error$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>${anchor}</svg>`;
  pop();
}
function Info($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>${anchor}</svg>`;
  pop();
}
function Warning($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17q0-.425-.288-.712T12 16q-.425 0-.712.288T11 17q0 .425.288.713T12 18m-1-3h2v-5h-2z"/>${anchor}</svg>`;
  pop();
}
function Success_standard_solid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 36 36" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z" class="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/>${anchor}</svg>`;
  pop();
}
function Circle_notifications($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 24 24" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M12 18.5q.625 0 1.063-.437T13.5 17h-3q0 .625.438 1.063T12 18.5M7 16h10v-2h-1v-2.6q0-1.525-.788-2.787T13 7v-.5q0-.425-.288-.712T12 5.5q-.425 0-.712.288T11 6.5V7q-1.425.35-2.212 1.613T8 11.4V14H7zm5 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>${anchor}</svg>`;
  pop();
}
function Alert($$payload, $$props) {
  push(false);
  let alertMsg = $$props["alertMsg"];
  let alertType = $$props["alertType"];
  const anchor = create_anchor($$payload);
  $$payload.out += `<div role="alert"${attr("class", `alert ${stringify(alertType === "alert" ? "" : "alert-" + alertType)}`, false)}>${anchor}`;
  if (alertType === "error") {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    Error$1($$payload, { class: "h-7 w-7" });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    if (alertType === "warning") {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_3}`;
      Warning($$payload, { class: "h-7 w-7" });
      $$payload.out += `${anchor_3}`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `${anchor_4}`;
      if (alertType === "success") {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_5 = create_anchor($$payload);
        $$payload.out += `${anchor_5}`;
        Success_standard_solid($$payload, { class: "h-7 w-7" });
        $$payload.out += `${anchor_5}`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
        const anchor_6 = create_anchor($$payload);
        $$payload.out += `${anchor_6}`;
        if (alertType === "info") {
          $$payload.out += "<!--ssr:if:true-->";
          const anchor_7 = create_anchor($$payload);
          $$payload.out += `${anchor_7}`;
          Info($$payload, { class: "h-7 w-7" });
          $$payload.out += `${anchor_7}`;
        } else {
          $$payload.out += "<!--ssr:if:false-->";
          const anchor_8 = create_anchor($$payload);
          $$payload.out += `${anchor_8}`;
          if (alertType === "alert") {
            $$payload.out += "<!--ssr:if:true-->";
            const anchor_9 = create_anchor($$payload);
            $$payload.out += `${anchor_9}`;
            Circle_notifications($$payload, { class: "h-7 w-7" });
            $$payload.out += `${anchor_9}`;
          } else {
            $$payload.out += "<!--ssr:if:false-->";
          }
          $$payload.out += `${anchor_8}`;
        }
        $$payload.out += `${anchor_6}`;
      }
      $$payload.out += `${anchor_4}`;
    }
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor} <span class="font-semibold">${escape(alertMsg)}</span></div>`;
  bind_props($$props, { alertMsg, alertType });
  pop();
}
function YouTubeFeed($$payload, $$props) {
  push(false);
  let ticker = $$props["ticker"];
  const anchor = create_anchor($$payload);
  $$payload.out += `<div><div class="text-3xl font-semibold">${escape(ticker.info.symbol)} Videos</div> ${anchor}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `<div class="py-5">${anchor_3}`;
    Alert($$payload, {
      alertMsg: "Video API may be tired...",
      alertType: "warning"
    });
    $$payload.out += `${anchor_3}</div>`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { ticker });
  pop();
}
function AiSentiment($$payload, $$props) {
  push(false);
  const getHistoryLength = (data2) => {
    if (data2.price_history) {
      return data2.price_history.length;
    } else {
      return 0;
    }
  };
  let data = $$props["data"];
  `Using the following financial data and newsfeed headlines, give a brief analysis and sentiment of ${data.ticker_info.symbol} (${data.ticker_info.shortName}). Be sure to write the output in plain html (no colors). I am primarily interested in the overall sentiment of the stock, as well as any notable financial data, patterns, or trends that you notice. Be sure that your analysis is concise, and written like an article (in sentences/paragraphs), or human conversation. Only include your sentiment alaysis in your response. Your response should be 5-7 sentences, max. Here are the closing prices for the last ${String(getHistoryLength(data))} days (oldest to newest): ${JSON.stringify(data.price_history.slice(-getHistoryLength(data)).map((item) => formatPrice(item["Close"])))} Here is the recent newsfeed: ${JSON.stringify(data.news.map((item) => ({
    date: item["providerPublishTime"],
    title: item["title"]
  })))}. Here is all the company and financial data: ${JSON.stringify(data.ticker_info)}.`;
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div><div class="ai-sentiment-text text-3xl font-semibold">AI Sentiment</div> <div class="mx-auto w-full max-w-2xl py-5"><div class="chat chat-start"><div class="chat-image avatar"><div class="border-primary h-10 w-10 rounded-full border-2 shadow sm:h-16 sm:w-16"><img alt="Tailwind CSS chat bubble component" src="/images/robotAvatar.png" class="scale-x-[-1]"></div></div> <div class="chat-header flex items-center gap-2"><div>StonkBot</div> <div><time class="text-xs opacity-50">${escape((/* @__PURE__ */ new Date()).toLocaleTimeString())}</time></div></div> ${anchor}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} ${anchor_1}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_1}</div></div></div>`;
  bind_props($$props, { data });
  pop();
}
function OptionsChain($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (data.options.length > 0) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `<div><div class="flex items-center gap-2"><div class="flex items-center gap-2"><div class="text-3xl font-semibold">Options Chain</div> <div class="badge badge-warning">Expiration Dates</div></div></div> ${anchor_1}`;
    {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_12 = create_anchor($$payload);
      const each_array_2 = ensure_array_like(data.options);
      $$payload.out += `<div class="grid grid-cols-2 gap-2 py-5 sm:grid-cols-3 lg:grid-cols-4">${anchor_12}`;
      for (let $$index_2 = 0; $$index_2 < each_array_2.length; $$index_2++) {
        const strike_date = each_array_2[$$index_2];
        const anchor_13 = create_anchor($$payload);
        $$payload.out += `${anchor_13}<button class="btn btn-primary"><div class="text-lg font-semibold">${escape(strike_date)}</div></button>${anchor_13}`;
      }
      $$payload.out += `${anchor_12}</div>`;
    }
    $$payload.out += `${anchor_1}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<div class="flex items-center gap-2"><div class="animate-pulse text-3xl font-semibold">Fetching Options Chain...</div> <span class="loading loading-spinner text-primary"></span></div>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { data });
  pop();
}
function _page($$payload, $$props) {
  push(false);
  let data = $$props["data"];
  let ticker = generateTicker(data);
  let onlyPrices;
  let onlyDates;
  let predicted_prices;
  let companyOfficers;
  if (data.ticker_info.companyOfficers) {
    companyOfficers = data.ticker_info.companyOfficers.map((officer) => {
      return {
        name: officer.name,
        title: officer.title,
        age: officer.age,
        fiscalYear: officer.fiscalYear,
        totalPay: officer.totalPay,
        exercisedValue: officer.exercisedValue,
        unexercisedValue: officer.unexercisedValue
      };
    });
  }
  const anchor = create_anchor($$payload);
  $$payload.out += `<div>${anchor}`;
  if (data.price_history.length === 0) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `<div>${anchor_1}`;
    Alert($$payload, {
      alertMsg: `No data found for ticker: "${data.ticker_info.symbol}"`,
      alertType: "warning"
    });
    $$payload.out += `${anchor_1}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    const anchor_3 = create_anchor($$payload);
    const anchor_4 = create_anchor($$payload);
    const anchor_5 = create_anchor($$payload);
    const anchor_6 = create_anchor($$payload);
    const anchor_7 = create_anchor($$payload);
    const anchor_8 = create_anchor($$payload);
    const anchor_9 = create_anchor($$payload);
    const anchor_10 = create_anchor($$payload);
    const anchor_11 = create_anchor($$payload);
    $$payload.out += `<div class="flex flex-col gap-10">${anchor_2}`;
    TickerHeading($$payload, { ticker, data });
    $$payload.out += `${anchor_2} ${anchor_3}`;
    AnalystData($$payload, { ticker });
    $$payload.out += `${anchor_3} ${anchor_4}`;
    AiSentiment($$payload, { data });
    $$payload.out += `${anchor_4} ${anchor_5}`;
    CompanyData($$payload, { ticker });
    $$payload.out += `${anchor_5} ${anchor_6}`;
    AiForecast($$payload, { predicted_prices, onlyPrices, onlyDates });
    $$payload.out += `${anchor_6} ${anchor_7}`;
    NewsFeed($$payload, { data, ticker });
    $$payload.out += `${anchor_7} ${anchor_8}`;
    YouTubeFeed($$payload, { ticker });
    $$payload.out += `${anchor_8} ${anchor_9}`;
    CompanyDescription($$payload, { data, ticker });
    $$payload.out += `${anchor_9} ${anchor_10}`;
    CompanyOfficers($$payload, { data, companyOfficers });
    $$payload.out += `${anchor_10} ${anchor_11}`;
    OptionsChain($$payload, { data });
    $$payload.out += `${anchor_11}</div>`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
