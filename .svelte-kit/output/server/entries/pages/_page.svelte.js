import { z as create_anchor, F as spread_attributes, B as pop, G as sanitize_props, y as push, O as value_or_fallback, J as store_get, T as escape, I as attr, K as unsubscribe_stores, A as bind_props } from "../../chunks/index3.js";
import "../../chunks/client.js";
import { w as writable } from "../../chunks/index2.js";
function Stock_market($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 48 48" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<defs><mask id="ipTStockMarket0"><g fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="M6 20h8v14H6zm14-6h8v26h-8z"/><path stroke-linecap="round" d="M24 44v-4"/><path fill="#555" d="M34 12h8v9h-8z"/><path stroke-linecap="round" d="M10 20V10m28 24V21m0-9V4"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTStockMarket0)"/>${anchor}</svg>`;
  pop();
}
function Send_fill($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<svg${spread_attributes(
    [
      { "viewBox": "0 0 16 16" },
      { "width": "1.2em" },
      { "height": "1.2em" },
      $$sanitized_props
    ],
    false,
    true,
    ""
  )}>${anchor}<path fill="currentColor" d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26l.001.002l4.995 3.178l3.178 4.995l.002.002l.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215l7.494-7.494l1.178-.471z"/>${anchor}</svg>`;
  pop();
}
function Machine_learning_model($$payload, $$props) {
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
  )}>${anchor}<path fill="currentColor" d="M27 24a2.96 2.96 0 0 0-1.285.3l-4.3-4.3H18v2h2.586l3.715 3.715A2.967 2.967 0 0 0 24 27a3 3 0 1 0 3-3m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1m0-15a2.995 2.995 0 0 0-2.816 2H18v2h6.184A2.995 2.995 0 1 0 27 13m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1m0-15a3.003 3.003 0 0 0-3 3a2.966 2.966 0 0 0 .348 1.373L20.596 10H18v2h3.404l4.4-4.252A2.999 2.999 0 1 0 27 2m0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1"/><path fill="currentColor" d="M18 6h2V4h-2a3.976 3.976 0 0 0-3 1.382A3.976 3.976 0 0 0 12 4h-1a9.01 9.01 0 0 0-9 9v6a9.01 9.01 0 0 0 9 9h1a3.976 3.976 0 0 0 3-1.382A3.976 3.976 0 0 0 18 28h2v-2h-2a2.002 2.002 0 0 1-2-2V8a2.002 2.002 0 0 1 2-2m-6 20h-1a7.005 7.005 0 0 1-6.92-6H6v-2H4v-4h3a3.003 3.003 0 0 0 3-3V9H8v2a1 1 0 0 1-1 1H4.08A7.005 7.005 0 0 1 11 6h1a2.002 2.002 0 0 1 2 2v4h-2v2h2v4h-2a3.003 3.003 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h2v4a2.002 2.002 0 0 1-2 2"/>${anchor}</svg>`;
  pop();
}
function _page($$payload, $$props) {
  push(false);
  var $$store_subs;
  let inputValue = "";
  let isLoading = writable(false);
  let option = value_or_fallback($$props["option"], {
    contractSymbol: "AAPL220121C00100000",
    strike: 100,
    lastPrice: 0.01,
    bid: 0.01,
    ask: 0.01,
    change: 0,
    percentChange: 0,
    volume: 0,
    openInterest: 0,
    impliedVolatility: 0,
    inTheMoney: "true",
    contractSize: "REGULAR"
  });
  const anchor = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  const anchor_5 = create_anchor($$payload);
  $$payload.out += `<div class="mx-auto flex w-full flex-col items-center justify-center gap-3 py-5 sm:py-20"><div class="flex items-center gap-2"><div>${anchor}`;
  if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="bg-primary flex h-20 w-20 items-center justify-center rounded-full shadow transition-all duration-500 sm:h-24 sm:w-24"><span class="loading loading-ring loading-lg text-primary-content"></span></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    Stock_market($$payload, {
      class: "text-primary-content btn btn-primary h-20 w-20 sm:h-24 sm:w-24"
    });
    $$payload.out += `${anchor_1}`;
  }
  $$payload.out += `${anchor}</div> <div class="align-middle font-sans text-7xl font-thin sm:text-8xl">stonk ai</div></div> ${anchor_2}`;
  if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="flex items-end gap-1 font-thin"><div>Searching <span class="uppercase">${escape(inputValue)}</span></div> <div>...</div></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<div class="font-thin">AI enhanced financial sentiment &amp; analysis engine.</div>`;
  }
  $$payload.out += `${anchor_2} <form class="flex w-full max-w-sm flex-col gap-3"><div class="w-full"><label class="input input-bordered flex w-full items-center gap-2 focus-within:outline-none"><input autofocus type="text" class="grow uppercase" placeholder="Enter a stock ticker..."${attr("value", inputValue, false)}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-7 w-7 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd"></path></svg></label> <div class="flex w-full max-w-lg items-center gap-2 pt-5"><div class="w-full"><button type="submit" class="btn btn-primary w-full">${anchor_3}`;
  if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<span class="loading loading-infinity loading-md scale-125"></span>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_4 = create_anchor($$payload);
    $$payload.out += `<div class="flex items-center gap-2"><div class="uppercase">search</div> <div>${anchor_4}`;
    Send_fill($$payload, { class: "h-5 w-5" });
    $$payload.out += `${anchor_4}</div></div>`;
  }
  $$payload.out += `${anchor_3}</button></div> <div class="w-full"><a href="/about" class="btn btn-outline w-full"><div class="flex items-center gap-2"><div class="uppercase">Learn More</div> <div>${anchor_5}`;
  Machine_learning_model($$payload, { class: "h-5 w-5" });
  $$payload.out += `${anchor_5}</div></div></a></div></div></div></form></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { option });
  pop();
}
export {
  _page as default
};
