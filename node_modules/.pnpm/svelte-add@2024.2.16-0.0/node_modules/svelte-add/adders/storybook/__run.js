/** @type {import("../..").AdderRun<import("./__info.js").Options>} */
export const run = async ({ runCommand }) => {
	await runCommand({
		// todo: pnpx / pnpm dlx or yarn dlx too
		command: ["npx", "storybook", "init", "--", "--skip-install"],
		async interact() {},
	});
};
