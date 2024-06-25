import { c as current_effect, M as MANAGED, a as current_block, b as current_component_context, s as schedule_effect, R as RENDER_EFFECT, D as DIRTY, S as SOURCE, C as CLEAN, i as is_frozen, d as STATE_SYMBOL, o as object_prototype, e as array_prototype, f as define_property, g as is_array, h as set, u as updating_derived, j as get_descriptor, k as get, U as UNINITIALIZED, l as untrack, m as get_prototype_of, n as set_signal_value, p as ROOT_BLOCK, q as flush_sync, r as array_from, t as destroy_signal, v as push, w as pop, P as PassiveDelegatedEvents, x as render, y as push$1, z as create_anchor, A as bind_props, B as pop$1 } from "./index3.js";
import { s as setContext } from "./main-client.js";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function default_equals(a, b) {
  return a === b;
}
function safe_not_equal(a, b) {
  return a != a ? (
    // eslint-disable-next-line eqeqeq
    b == b
  ) : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equal(a, b) {
  return !safe_not_equal(a, b);
}
function create_computation_signal(flags, value, block) {
  const signal = {
    b: block,
    c: null,
    d: null,
    e: null,
    f: flags,
    l: 0,
    i: null,
    r: null,
    v: value,
    w: 0,
    x: null,
    y: null
  };
  return signal;
}
function push_reference(target_signal, ref_signal) {
  const references = target_signal.r;
  if (references === null) {
    target_signal.r = [ref_signal];
  } else {
    references.push(ref_signal);
  }
}
function internal_create_effect(type, fn, sync, block, schedule) {
  const signal = create_computation_signal(type | DIRTY, null, block);
  signal.i = fn;
  signal.x = current_component_context;
  if (current_effect !== null) {
    signal.l = current_effect.l + 1;
    if ((type & MANAGED) === 0) {
      push_reference(current_effect, signal);
    }
  }
  if (schedule) {
    schedule_effect(signal, sync);
  }
  return signal;
}
function effect_active() {
  return current_effect ? (current_effect.f & MANAGED) === 0 : false;
}
function render_effect(fn, block = current_block, managed = false, sync = true) {
  let flags = RENDER_EFFECT;
  if (managed) {
    flags |= MANAGED;
  }
  return internal_create_effect(
    flags,
    /** @type {any} */
    fn,
    sync,
    block,
    true
  );
}
// @__NO_SIDE_EFFECTS__
function source(initial_value) {
  return create_source_signal(SOURCE | CLEAN, initial_value);
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  const s = /* @__PURE__ */ source(initial_value);
  s.e = safe_equal;
  if (current_component_context) {
    (current_component_context.d ??= []).push(s);
  }
  return s;
}
function create_source_signal(flags, value) {
  return {
    // consumers
    c: null,
    // equals
    e: default_equals,
    // flags
    f: flags,
    // value
    v: value,
    // write version
    w: 0
  };
}
function proxy(value, immutable = true, owners) {
  if (typeof value === "object" && value != null && !is_frozen(value)) {
    if (STATE_SYMBOL in value) {
      const metadata = (
        /** @type {import('./types.js').ProxyMetadata<T>} */
        value[STATE_SYMBOL]
      );
      if (metadata.t === value || metadata.p === value) {
        return metadata.p;
      }
    }
    const prototype = get_prototype_of(value);
    if (prototype === object_prototype || prototype === array_prototype) {
      const proxy2 = new Proxy(value, state_proxy_handler);
      define_property(value, STATE_SYMBOL, {
        value: (
          /** @type {import('./types.js').ProxyMetadata} */
          {
            s: /* @__PURE__ */ new Map(),
            v: /* @__PURE__ */ source(0),
            a: is_array(value),
            i: immutable,
            p: proxy2,
            t: value
          }
        ),
        writable: true,
        enumerable: false
      });
      return proxy2;
    }
  }
  return value;
}
function update_version(signal, d = 1) {
  const value = untrack(() => get(signal));
  set_signal_value(signal, value + d);
}
const state_proxy_handler = {
  defineProperty(target, prop, descriptor) {
    if (descriptor.value) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop);
      if (s !== void 0)
        set(s, proxy(descriptor.value, metadata.i, metadata.o));
    }
    return Reflect.defineProperty(target, prop, descriptor);
  },
  deleteProperty(target, prop) {
    const metadata = target[STATE_SYMBOL];
    const s = metadata.s.get(prop);
    const is_array2 = metadata.a;
    const boolean = delete target[prop];
    if (is_array2 && boolean) {
      const ls = metadata.s.get("length");
      const length = target.length - 1;
      if (ls !== void 0 && ls.v !== length) {
        set(ls, length);
      }
    }
    if (s !== void 0)
      set(s, UNINITIALIZED);
    if (boolean) {
      update_version(metadata.v);
    }
    return boolean;
  },
  get(target, prop, receiver) {
    if (prop === STATE_SYMBOL) {
      return Reflect.get(target, STATE_SYMBOL);
    }
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop);
    if (s === void 0 && (effect_active() || updating_derived) && (!(prop in target) || get_descriptor(target, prop)?.writable)) {
      s = (metadata.i ? source : mutable_source)(proxy(target[prop], metadata.i, metadata.o));
      metadata.s.set(prop, s);
    }
    if (s !== void 0) {
      const value = get(s);
      return value === UNINITIALIZED ? void 0 : value;
    }
    return Reflect.get(target, prop, receiver);
  },
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    if (descriptor && "value" in descriptor) {
      const metadata = target[STATE_SYMBOL];
      const s = metadata.s.get(prop);
      if (s) {
        descriptor.value = get(s);
      }
    }
    return descriptor;
  },
  has(target, prop) {
    if (prop === STATE_SYMBOL) {
      return true;
    }
    const metadata = target[STATE_SYMBOL];
    const has = Reflect.has(target, prop);
    let s = metadata.s.get(prop);
    if (s !== void 0 || effect_active() && (!has || get_descriptor(target, prop)?.writable)) {
      if (s === void 0) {
        s = (metadata.i ? source : mutable_source)(
          has ? proxy(target[prop], metadata.i, metadata.o) : UNINITIALIZED
        );
        metadata.s.set(prop, s);
      }
      const value = get(s);
      if (value === UNINITIALIZED) {
        return false;
      }
    }
    return has;
  },
  set(target, prop, value, receiver) {
    const metadata = target[STATE_SYMBOL];
    let s = metadata.s.get(prop);
    if (s === void 0 && effect_active()) {
      untrack(() => receiver[prop]);
      s = metadata.s.get(prop);
    }
    if (s !== void 0) {
      set(s, proxy(value, metadata.i, metadata.o));
    }
    const is_array2 = metadata.a;
    const not_has = !(prop in target);
    if (is_array2 && prop === "length") {
      for (let i = value; i < target.length; i += 1) {
        const s2 = metadata.s.get(i + "");
        if (s2 !== void 0)
          set(s2, UNINITIALIZED);
      }
    }
    target[prop] = value;
    if (not_has) {
      if (is_array2) {
        const ls = metadata.s.get("length");
        const length = target.length;
        if (ls !== void 0 && ls.v !== length) {
          set(ls, length);
        }
      }
      update_version(metadata.v);
    }
    return true;
  },
  ownKeys(target) {
    const metadata = target[STATE_SYMBOL];
    get(metadata.v);
    return Reflect.ownKeys(target);
  }
};
var node_prototype;
var element_prototype;
var text_prototype;
function init_operations() {
  if (node_prototype !== void 0) {
    return;
  }
  node_prototype = Node.prototype;
  element_prototype = Element.prototype;
  text_prototype = Text.prototype;
  node_prototype.appendChild;
  node_prototype.cloneNode;
  element_prototype.__click = void 0;
  text_prototype.__nodeValue = " ";
  element_prototype.__className = "";
  // @ts-ignore
  get_descriptor(node_prototype, "firstChild").get;
  // @ts-ignore
  get_descriptor(node_prototype, "nextSibling").get;
  // @ts-ignore
  get_descriptor(node_prototype, "textContent").set;
  // @ts-ignore
  get_descriptor(element_prototype, "className").set;
}
function empty() {
  return document.createTextNode("");
}
function set_current_hydration_fragment(fragment) {
}
function get_hydration_fragment(node, insert_text = false) {
  const fragment = [];
  let current_node = node;
  let target_depth = null;
  while (current_node !== null) {
    const node_type = current_node.nodeType;
    const next_sibling = current_node.nextSibling;
    if (node_type === 8) {
      const data = (
        /** @type {Comment} */
        current_node.data
      );
      if (data.startsWith("ssr:")) {
        const depth = data.slice(4);
        if (target_depth === null) {
          target_depth = depth;
        } else if (depth === target_depth) {
          if (insert_text && fragment.length === 0) {
            const text = empty();
            fragment.push(text);
            current_node.parentNode.insertBefore(text, current_node);
          }
          return fragment;
        } else {
          fragment.push(
            /** @type {Text | Comment | Element} */
            current_node
          );
        }
        current_node = next_sibling;
        continue;
      }
    }
    if (target_depth !== null) {
      fragment.push(
        /** @type {Text | Comment | Element} */
        current_node
      );
    }
    current_node = next_sibling;
  }
  return null;
}
function remove(current) {
  var first_node = current;
  if (is_array(current)) {
    var i = 0;
    var node;
    for (; i < current.length; i++) {
      node = current[i];
      if (i === 0) {
        first_node = node;
      }
      if (node.isConnected) {
        node.remove();
      }
    }
  } else if (current.isConnected) {
    current.remove();
  }
  return (
    /** @type {Element | Comment | Text} */
    first_node
  );
}
function create_root_block(intro) {
  return {
    // dom
    d: null,
    // effect
    e: null,
    // intro
    i: intro,
    // parent
    p: null,
    // transition
    r: null,
    // type
    t: ROOT_BLOCK
  };
}
const all_registerd_events = /* @__PURE__ */ new Set();
const root_event_handles = /* @__PURE__ */ new Set();
function handle_event_propagation(handler_element, event) {
  const owner_document = handler_element.ownerDocument;
  const event_name = event.type;
  const path = event.composedPath?.() || [];
  let current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  if (event.target !== current_target) {
    define_property(event, "target", {
      configurable: true,
      value: current_target
    });
  }
  let path_idx = 0;
  const handled_at = event.__root;
  if (handled_at) {
    const at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    const handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx + 1;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  while (current_target !== null) {
    const parent_element = current_target.parentNode || /** @type {any} */
    current_target.host || null;
    const internal_prop_name = "__" + event_name;
    const delegated = current_target[internal_prop_name];
    if (delegated !== void 0 && !/** @type {any} */
    current_target.disabled) {
      if (is_array(delegated)) {
        const [fn, ...data] = delegated;
        fn.apply(current_target, [event, ...data]);
      } else {
        delegated.call(current_target, event);
      }
    }
    if (event.cancelBubble || parent_element === handler_element || current_target === handler_element) {
      break;
    }
    current_target = parent_element;
  }
  event.__root = handler_element;
  current_target = handler_element;
}
function mount(component, options2) {
  init_operations();
  const anchor = empty();
  options2.target.appendChild(anchor);
  return flush_sync(() => _mount(component, { ...options2, anchor }), false);
}
function hydrate(component, options2) {
  init_operations();
  const container = options2.target;
  const first_child = (
    /** @type {ChildNode} */
    container.firstChild
  );
  const hydration_fragment = get_hydration_fragment(first_child, true);
  let anchor = null;
  if (hydration_fragment === null) {
    anchor = empty();
    container.appendChild(anchor);
  }
  let finished_hydrating = false;
  try {
    return flush_sync(() => {
      const instance = _mount(component, { ...options2, anchor });
      set_current_hydration_fragment(null);
      finished_hydrating = true;
      return instance;
    }, false);
  } catch (error) {
    if (!finished_hydrating && options2.recover !== false && hydration_fragment !== null) {
      console.error(
        "ERR_SVELTE_HYDRATION_MISMATCH",
        error
      );
      remove(hydration_fragment);
      first_child.remove();
      hydration_fragment[hydration_fragment.length - 1]?.nextSibling?.remove();
      return mount(component, options2);
    } else {
      throw error;
    }
  } finally {
  }
}
function _mount(Component, options2) {
  const registered_events = /* @__PURE__ */ new Set();
  const container = options2.target;
  const block = create_root_block(options2.intro || false);
  let component = void 0;
  const effect = render_effect(
    () => {
      if (options2.context) {
        push({});
        current_component_context.c = options2.context;
      }
      if (!options2.props) {
        options2.props = /** @type {Props} */
        {};
      }
      if (options2.events) {
        options2.props.$$events = options2.events;
      }
      component = // @ts-expect-error the public typings are not what the actual function looks like
      Component(options2.anchor, options2.props) || {};
      if (options2.context) {
        pop();
      }
    },
    block,
    true
  );
  block.e = effect;
  const bound_event_listener = handle_event_propagation.bind(null, container);
  const bound_document_event_listener = handle_event_propagation.bind(null, document);
  const event_handle = (events) => {
    for (let i = 0; i < events.length; i++) {
      const event_name = events[i];
      if (!registered_events.has(event_name)) {
        registered_events.add(event_name);
        container.addEventListener(
          event_name,
          bound_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
        document.addEventListener(
          event_name,
          bound_document_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
      }
    }
  };
  event_handle(array_from(all_registerd_events));
  root_event_handles.add(event_handle);
  mounted_components.set(component, () => {
    for (const event_name of registered_events) {
      container.removeEventListener(event_name, bound_event_listener);
    }
    root_event_handles.delete(event_handle);
    const dom = block.d;
    if (dom !== null) {
      remove(dom);
    }
    destroy_signal(
      /** @type {import('./types.js').EffectSignal} */
      block.e
    );
  });
  return component;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component) {
  const fn = mounted_components.get(component);
  fn?.();
}
function asClassComponent$1(component) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component,
        ...options2
      });
    }
  };
}
class Svelte4Component {
  /** @type {any} */
  #events = {};
  /** @type {Record<string, any>} */
  #instance;
  /**
   * @param {import('../main/public.js').ComponentConstructorOptions & {
   *  component: any;
   * 	immutable?: boolean;
   * 	hydrate?: boolean;
   * 	recover?: false;
   * }} options
   */
  constructor(options2) {
    const props = proxy({ ...options2.props || {}, $$events: this.#events }, false);
    this.#instance = (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      props,
      context: options2.context,
      intro: options2.intro,
      recover: options2.recover
    });
    for (const key of Object.keys(this.#instance)) {
      define_property(this, key, {
        get() {
          return this.#instance[key];
        },
        /** @param {any} value */
        set(value) {
          this.#instance[key] = value;
        },
        enumerable: true
      });
    }
    this.#instance.$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    this.#instance.$destroy = () => {
      unmount(this.#instance);
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    this.#instance.$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    this.#events[event] = this.#events[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    this.#events[event].push(cb);
    return () => {
      this.#events[event] = this.#events[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    this.#instance.$destroy();
  }
}
function asClassComponent(component) {
  const component_constructor = asClassComponent$1(component);
  const _render = (props, { context } = {}) => {
    const result = render(component, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.html
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
function Root($$payload, $$props) {
  push$1(true);
  let {
    stores,
    page,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page);
  }
  const anchor = create_anchor($$payload);
  const anchor_4 = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (constructors[1]) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    constructors[0]?.($$payload, {
      data: data_0,
      children: ($$payload2, $$slotProps) => {
        const anchor_2 = create_anchor($$payload2);
        $$payload2.out += `${anchor_2}`;
        constructors[1]?.($$payload2, { data: data_1, form });
        $$payload2.out += `${anchor_2}`;
      }
    });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `${anchor_3}`;
    constructors[0]?.($$payload, { data: data_0, form });
    $$payload.out += `${anchor_3}`;
  }
  $$payload.out += `${anchor} ${anchor_4}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_4}`;
  bind_props($$props, {
    stores,
    page,
    constructors,
    components,
    form,
    data_0,
    data_1
  });
  pop$1();
}
const root = asClassComponent(Root);
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en" data-theme="dim" class="@apply bg-base-200">\n	 \n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<link\n			href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"\n			rel="stylesheet"\n		/>\n\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1s1np10"
};
async function get_hooks() {
  return {};
}
export {
  assets as a,
  base as b,
  options as c,
  set_private_env as d,
  prerendering as e,
  set_public_env as f,
  get_hooks as g,
  set_safe_public_env as h,
  set_assets as i,
  set_building as j,
  set_manifest as k,
  set_prerendering as l,
  set_read_implementation as m,
  override as o,
  public_env as p,
  reset as r,
  safe_public_env as s
};
