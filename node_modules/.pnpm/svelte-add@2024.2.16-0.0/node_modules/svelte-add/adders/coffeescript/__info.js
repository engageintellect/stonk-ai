import { getViteConfigFilePath } from "../../adder-tools.js";

export const name = "CoffeeScript";

export const emoji = "☕️";

export const usageMarkdown = ['You can write CoffeeScript syntax in the `script lang="coffee"` blocks in Svelte files.', "You can write CoffeeScript syntax in `.coffee` files and import them elsewhere."];

/** @typedef {{}} Options */

/** @type {import("../..").Gatekeep} */
export const gatekeep = async () => {
	return { able: true };
};

/** @type {import("../..").AdderOptions<Options>} */
export const options = {};

/** @type {import("../..").Heuristic[]} */
export const heuristics = [
	{
		description: "`coffeescript` is installed",
		async detector({ folderInfo }) {
			return "coffeescript" in folderInfo.allDependencies;
		},
	},
	{
		description: "`vitePreprocess` is set up for CoffeeScript in `svelte.config.js`",
		async detector({ readFile }) {
			/** @param {string} text */
			const sveltePreprocessIsProbablySetup = (text) => {
				if (!text.includes("vitePreprocess")) return false;

				return true;
			};

			const js = await readFile({ path: "/svelte.config.js" });
			const cjs = await readFile({ path: "/svelte.config.cjs" });

			if (js.exists) return sveltePreprocessIsProbablySetup(js.text);
			else if (cjs.exists) return sveltePreprocessIsProbablySetup(cjs.text);

			return false;
		},
	},
	{
		description: "The Vite CoffeeScript plugin is set up",
		async detector({ readFile, folderInfo }) {
			/** @param {string} text */
			const vitePluginIsProbablySetup = (text) => {
				if (!text.includes("vite-plugin-coffee")) return false;
				if (!text.includes("coffee(")) return false;

				return true;
			};

			const vite = await readFile({ path: `/${getViteConfigFilePath(folderInfo)}` });

			if (vitePluginIsProbablySetup(vite.text)) return true;

			return false;
		},
	},
];
