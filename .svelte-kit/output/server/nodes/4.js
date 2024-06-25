import * as server from '../entries/pages/ticker/_slug_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ticker/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ticker/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.BoplFFha.js","_app/immutable/chunks/disclose-version.o3bL7pgj.js","_app/immutable/chunks/runtime.CCJSyFDm.js","_app/immutable/chunks/if.C9QzEhLy.js","_app/immutable/chunks/store.DeE9seT5.js","_app/immutable/chunks/index.Cg3a2VvE.js","_app/immutable/chunks/index.DQmVhOwz.js","_app/immutable/chunks/main-client.B6bI6VV2.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.fE7ng71t.js"];
export const stylesheets = ["_app/immutable/assets/4.CcVGCdaC.css","_app/immutable/assets/SvelteToast.CkZHBl_7.css"];
export const fonts = [];
