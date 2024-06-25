import { E as on_destroy, z as create_anchor, F as spread_attributes, B as pop, G as sanitize_props, y as push, H as ensure_array_like, I as attr, J as store_get, K as unsubscribe_stores, L as stringify, N as spread_props, A as bind_props, O as value_or_fallback, Q as slot } from "../../chunks/index3.js";
import daisyuiColors from "daisyui/src/theming/themes.js";
import { w as writable } from "../../chunks/index2.js";
import { t as toast } from "../../chunks/SvelteToast.svelte_svelte_type_style_lang.js";
const raf = {
  tick: (
    /** @param {any} _ */
    (_) => requestAnimationFrame(_)
  ),
  now: () => performance.now()
};
function onDestroy(fn) {
  on_destroy.push(fn);
}
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
  )}>${anchor}<g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path fill="currentColor" d="M6 20h8v14H6zm14-6h8v26h-8z"/><path stroke-linecap="round" d="M24 44v-4"/><path fill="currentColor" d="M34 12h8v9h-8z"/><path stroke-linecap="round" d="M10 20V10m28 24V21m0-9V4"/></g>${anchor}</svg>`;
  pop();
}
function Themes($$payload, $$props) {
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
  )}>${anchor}<path fill="currentColor" d="M4 6a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2H4zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2m-5 14H8V9h7zm5 0h-3V9h3zm0-9H8V4h12z"/>${anchor}</svg>`;
  pop();
}
function Nav($$payload, $$props) {
  push(false);
  let themes = Object.keys(daisyuiColors);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const each_array = ensure_array_like(themes);
  $$payload.out += `<div class="navbar bg-base-100 sticky top-0 z-20"><div class="mx-auto w-full max-w-3xl"><div class="flex-1"><a href="/" class="btn btn-primary text-xl">${anchor}`;
  Stock_market($$payload, { class: "h-7 w-7" });
  $$payload.out += `${anchor}</a></div> <div class="flex items-center"><div class="dropdown dropdown-end"><div tabindex="0" role="button"><div class="btn btn-ghost flex items-center gap-2"><div class="text-lg font-thin">Theme</div> ${anchor_1}`;
  Themes($$payload, { class: "h-7 w-7" });
  $$payload.out += `${anchor_1}</div></div> <ul tabindex="0" class="dropdown-content bg-base-100 border-primary rounded-box dropdown-end -z-[-1] h-96 w-52 overflow-auto border p-2 shadow">${anchor_2}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const theme = each_array[$$index];
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `${anchor_3}<li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start text-lg font-thin"${attr("aria-label", theme, false)}${attr("value", theme, false)}></li>${anchor_3}`;
  }
  $$payload.out += `${anchor_2}</ul></div> <div class="flex-none gap-2"><div class="dropdown dropdown-end"><div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar"><div class="border-primary w-10 rounded-full border-2"><img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"></div></div> <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 border-primary rounded-box z-[1] w-52 border text-lg shadow"><li><a class="justify-between text-lg">Profile <span class="badge">New</span></a></li> <li><a class="text-lg">Settings</a></li> <li><a class="text-lg">Logout</a></li></ul></div></div></div></div></div>`;
  pop();
}
function Search($$payload, $$props) {
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
  )}>${anchor}<path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/>${anchor}</svg>`;
  pop();
}
function Github($$payload, $$props) {
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
  )}>${anchor}<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>${anchor}</svg>`;
  pop();
}
function Mail($$payload, $$props) {
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
  )}>${anchor}<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>${anchor}</svg>`;
  pop();
}
function BottomNav($$payload, $$props) {
  push(false);
  var $$store_subs;
  const activeIndex = writable(-1);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  $$payload.out += `<div class="btm-nav border-primary z-50 border-t"><a href="/"${attr(
    "class",
    [
      store_get($$store_subs ??= {}, "$activeIndex", activeIndex) === 0 ? "active" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor}`;
  Search($$payload, { class: "h-16 w-16 rounded px-4 py-2" });
  $$payload.out += `${anchor}</a> <a href="https://github.com/engageintellect"${attr(
    "class",
    [
      store_get($$store_subs ??= {}, "$activeIndex", activeIndex) === 1 ? "active" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor_1}`;
  Github($$payload, { class: "h-16 w-16 rounded px-4 py-2" });
  $$payload.out += `${anchor_1}</a> <a href="mailto:engage.intellect@protonmail.com"${attr(
    "class",
    [
      store_get($$store_subs ??= {}, "$activeIndex", activeIndex) === 2 ? "active" : ""
    ].filter(Boolean).join(" "),
    false
  )}>${anchor_2}`;
  Mail($$payload, { class: "h-16 w-16 rounded px-4 py-2" });
  $$payload.out += `${anchor_2}</a></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function Footer($$payload, $$props) {
  push(false);
  $$payload.out += `<footer class="footer footer-center bg-base-200 text-base-content rounded p-10"><nav class="grid grid-flow-col gap-4"><a class="link link-hover" href="/about">About</a> <a class="link link-hover" href="mailto:engage.intellect@protonmail.com">Contact</a> <a class="link link-hover" href="https://github.com/engageintellect/ai-stock-client">Github</a></nav> <aside><p>Copyright © 2024 - <a href="https://github.com/engageintellect" target="_blank">@engageintellect</a></p></aside></footer> <div class="bg-base-200 h-16 w-full sm:hidden"></div>`;
  pop();
}
function linear(t) {
  return t;
}
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now) {
  tasks.forEach((task) => {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf.tick(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf.tick(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    target_value = new_value;
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = linear,
      interpolate = get_interpolator
    } = { ...defaults, ...opts };
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    task = loop((now) => {
      if (now < start)
        return true;
      if (!started) {
        fn = interpolate(
          /** @type {any} */
          value,
          new_value
        );
        if (typeof duration === "function")
          duration = duration(
            /** @type {any} */
            value,
            new_value
          );
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(
      /** @type {any} */
      target_value,
      /** @type {any} */
      value
    ), opts),
    subscribe: store.subscribe
  };
}
function ToastItem($$payload, $$props) {
  push(false);
  var $$store_subs;
  let item = $$props["item"];
  let next = item.initial;
  let cprops = {};
  const progress = tweened(item.initial, { duration: item.duration, easing: linear });
  function close() {
    toast.pop(item.id);
  }
  function autoclose() {
    if (store_get($$store_subs ??= {}, "$progress", progress) === 1 || store_get($$store_subs ??= {}, "$progress", progress) === 0)
      close();
  }
  function check(prop, kind = "undefined") {
    return typeof prop === kind;
  }
  onDestroy(() => {
    if (check(item.onpop, "function")) {
      item.onpop(item.id);
    }
  });
  if (!check(item.progress)) {
    item.next = item.progress;
  }
  if (next !== item.next) {
    next = item.next;
    store_get($$store_subs ??= {}, "$progress", progress);
    progress.set(next).then(autoclose);
  }
  if (item.component) {
    const { props = {}, sendIdTo } = item.component;
    cprops = {
      ...props,
      ...sendIdTo && { [sendIdTo]: item.id }
    };
  }
  const anchor = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  $$payload.out += `<div role="status"${attr("class", `_toastItem svelte-95rq8t ${stringify([item.pausable ? "pe" : ""].filter(Boolean).join(" "))}`, false)}><div${attr("class", `_toastMsg svelte-95rq8t ${stringify([item.component ? "pe" : ""].filter(Boolean).join(" "))}`, false)}>${anchor}`;
  if (item.component) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    item.component.src?.($$payload, spread_props([cprops]));
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}${item.msg}${anchor_2}`;
  }
  $$payload.out += `${anchor}</div> ${anchor_3}`;
  if (item.dismissable) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="_toastBtn pe svelte-95rq8t" role="button" tabindex="0"></div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_3} <progress class="_toastBar svelte-95rq8t"${attr("value", store_get($$store_subs ??= {}, "$progress", progress), false)}></progress></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { item });
  pop();
}
function SvelteToast($$payload, $$props) {
  push(false);
  var $$store_subs;
  let options = value_or_fallback($$props["options"], {});
  let target = value_or_fallback($$props["target"], "default");
  let items = [];
  function getCss(theme) {
    return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, "") : void 0;
  }
  toast._init(target, options);
  items = store_get($$store_subs ??= {}, "$toast", toast).filter((i) => i.target === target);
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(items);
  $$payload.out += `<ul class="_toastContainer svelte-1u812xz">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const item = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<li${attr("class", `${stringify(item.classes?.join(" "))} svelte-1u812xz`, false)}${attr("style", getCss(item.theme), false)}>${anchor_2}`;
    ToastItem($$payload, { item });
    $$payload.out += `${anchor_2}</li>${anchor_1}`;
  }
  $$payload.out += `${anchor}</ul>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { options, target });
  pop();
}
function _layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  const anchor_4 = create_anchor($$payload);
  $$payload.out += `<div class="flex flex-col justify-between sm:min-h-screen"><div class="sticky top-0 z-50 w-full shadow">${anchor}`;
  Nav($$payload);
  $$payload.out += `${anchor}</div> <div class="bg-base-200 flex w-full flex-1 items-start px-2 py-6 lg:items-start lg:px-6"><div class="mx-auto w-full max-w-3xl">${anchor_1}`;
  SvelteToast($$payload, {});
  $$payload.out += `${anchor_1} ${anchor_2}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_2}</div></div> <div>${anchor_3}`;
  Footer($$payload);
  $$payload.out += `${anchor_3}</div> <div class="fixed bottom-0 z-50 w-full bg-red-500 sm:hidden">${anchor_4}`;
  BottomNav($$payload);
  $$payload.out += `${anchor_4}</div></div>`;
  pop();
}
export {
  _layout as default
};
