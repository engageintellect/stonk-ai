export const name = "(work in progress) Routify";

export const emoji = "🎀";

export const usageMarkdown = ["WIP"];

/** @type {import("../..").Gatekeep} */
export const gatekeep = async ({ folderInfo }) => {
	if (folderInfo.kit) return { advice: "can only be selected when using Vite" };

	return { able: true };
};

/** @typedef {{}} Options */

/** @type {import("../..").AdderOptions<Options>} */
export const options = {};

/** @type {import("../..").Heuristic[]} */
export const heuristics = [
	{
		description: "`@roxi/routify` is installed",
		async detector({ folderInfo }) {
			return "@roxi/routify" in folderInfo.allDependencies;
		},
	},
];
