export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","favicon.png","images/modernChart.png","images/modernIcon.webp","images/robot14-nobg.png","images/robot16.png","images/robotAvatar.png","images/stonkAiIcon.png","sounds/bleep.mp3","sounds/ping.mp3","sounds/softBleep.mp3"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".mp3":"audio/mpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.D8GBj2ko.js","app":"_app/immutable/entry/app.bxNSO6cM.js","imports":["_app/immutable/entry/start.D8GBj2ko.js","_app/immutable/chunks/entry.SUtJ397N.js","_app/immutable/chunks/runtime.CCJSyFDm.js","_app/immutable/chunks/index.DQmVhOwz.js","_app/immutable/entry/app.bxNSO6cM.js","_app/immutable/chunks/runtime.CCJSyFDm.js","_app/immutable/chunks/disclose-version.o3bL7pgj.js","_app/immutable/chunks/if.C9QzEhLy.js","_app/immutable/chunks/main-client.B6bI6VV2.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/chatAi",
				pattern: /^\/api\/chatAi\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/chatAi/_server.ts.js'))
			},
			{
				id: "/api/getInterestRates",
				pattern: /^\/api\/getInterestRates\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/getInterestRates/_server.ts.js'))
			},
			{
				id: "/api/getOptionDelta",
				pattern: /^\/api\/getOptionDelta\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/getOptionDelta/_server.ts.js'))
			},
			{
				id: "/api/getOptionsChain",
				pattern: /^\/api\/getOptionsChain\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/getOptionsChain/_server.ts.js'))
			},
			{
				id: "/api/predictPrice",
				pattern: /^\/api\/predictPrice\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/predictPrice/_server.ts.js'))
			},
			{
				id: "/api/queryYouTube",
				pattern: /^\/api\/queryYouTube\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/queryYouTube/_server.ts.js'))
			},
			{
				id: "/ticker/[slug]",
				pattern: /^\/ticker\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
