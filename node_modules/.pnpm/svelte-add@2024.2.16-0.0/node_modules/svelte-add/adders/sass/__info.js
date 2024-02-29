import { getViteConfigFilePath } from "../../adder-tools.js";
import { extension } from "./stuff.js";

export const name = "SASS";

export const emoji = "🕶";

export const usageMarkdown = ['You can write SASS syntax in the `style lang="sass"` blocks in Svelte files.', 'You can write SASS syntax in the `src/variables.sass` file.\n\n  Variables and mixins written here are automatically available to all other SASS files and `style lang="sass"` blocks in Svelte files without needing to import this file.', "You can write SASS syntax in the `src/app.sass` file.\n\n  This is your global stylesheet because it will be active on every page of your site."];

/** @type {import("../..").Gatekeep} */
export const gatekeep = async () => {
	return { able: true };
};

/** @typedef {{}} Options */

/** @type {import("../..").AdderOptions<Options>} */
export const options = {};

/** @type {import("../..").Heuristic[]} */
export const heuristics = [
	{
		description: "`sass` is installed",
		async detector({ folderInfo }) {
			return "sass" in folderInfo.allDependencies;
		},
	},
	{
		description: "`vitePreprocess` is set up for SASS in `svelte.config.js`",
		async detector({ readFile }) {
			/** @param {string} text */
			const preprocessIsProbablySetup = (text) => {
				if (!text.includes("vitePreprocess")) return false;

				return true;
			};

			const js = await readFile({ path: "/svelte.config.js" });
			const cjs = await readFile({ path: "/svelte.config.cjs" });

			if (js.exists) {
				return preprocessIsProbablySetup(js.text);
			} else if (cjs.exists) {
				return preprocessIsProbablySetup(cjs.text);
			}

			return false;
		},
	},
	{
		description: "`src/app.sass` exists",
		async detector({ readFile }) {
			const sass = await readFile({ path: "/src/app.sass" });

			return sass.exists;
		},
	},
	{
		description: "`src/variables.sass` exists",
		async detector({ readFile }) {
			const sass = await readFile({ path: "/src/variables.sass" });

			return sass.exists;
		},
	},
	{
		description: "Vite is set up to automatically import variables.sass",
		async detector({ folderInfo, readFile }) {
			/** @param {string} text */
			const preprocessIsProbablySetup = (text) => {
				if (!text.includes("additionalData")) return false;
				if (!text.includes("@use")) return false;
				if (!text.includes("src/variables.sass")) return false;

				return true;
			};

			const vite = await readFile({ path: `/${getViteConfigFilePath(folderInfo)}` });

			if (preprocessIsProbablySetup(vite.text)) return true;

			return false;
		},
	},
	{
		description: "The main file (`src/routes/+layout.svelte` for SvelteKit, `src/main.js` or `src/main.ts` for Vite) imports `src/app.sass`",
		async detector({ folderInfo, readFile }) {
			if (folderInfo.kit) {
				const { text } = await readFile({ path: "/src/routes/+layout.svelte" });

				return text.includes(`../app.${extension}`);
			}

			const ts = await readFile({ path: "/src/main.ts" });
			if (ts.exists) return ts.text.includes(`./app.${extension}`);

			const js = await readFile({ path: "/src/main.js" });
			return js.text.includes(`./app.${extension}`);
		},
	},
];
