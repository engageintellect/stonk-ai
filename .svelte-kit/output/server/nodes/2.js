import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.B4cSXSVX.js","_app/immutable/chunks/disclose-version.o3bL7pgj.js","_app/immutable/chunks/runtime.CCJSyFDm.js","_app/immutable/chunks/if.C9QzEhLy.js","_app/immutable/chunks/store.DeE9seT5.js","_app/immutable/chunks/entry.SUtJ397N.js","_app/immutable/chunks/index.DQmVhOwz.js","_app/immutable/chunks/index.Cg3a2VvE.js"];
export const stylesheets = [];
export const fonts = [];
