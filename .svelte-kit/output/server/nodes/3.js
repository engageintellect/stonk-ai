

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.BcIHZnLl.js","_app/immutable/chunks/disclose-version.o3bL7pgj.js","_app/immutable/chunks/runtime.CCJSyFDm.js"];
export const stylesheets = [];
export const fonts = [];
