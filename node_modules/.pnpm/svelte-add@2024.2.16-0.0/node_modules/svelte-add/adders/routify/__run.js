import { Comment, Element, Text } from "domhandler";
import { appendChild, prependChild } from "domutils";
import { updateViteConfig } from "../../adder-tools.js";
import { addImport, setDefault } from "../../ast-tools.js";

/** @type {import("../..").AdderRun<import("./__info.js").Options>} */
export const run = async ({ folderInfo, install, updateJavaScript, updateSvelte }) => {
	await updateViteConfig({
		mutateViteConfig(viteConfig, containingFile, cjs) {
			let routifyVitePluginImportedAs = "routify";
			addImport({ require: routifyVitePluginImportedAs, cjs, default: routifyVitePluginImportedAs, package: "@roxi/routify/vite-plugin", typeScriptEstree: containingFile });

			const pluginsList = setDefault({
				object: viteConfig,
				default: {
					type: "ArrayExpression",
					elements: [],
				},
				property: "plugins",
			});
			if (pluginsList.type !== "ArrayExpression") throw new Error("`plugins` in Vite config needs to be an array");

			/** @type {import("estree").CallExpression | undefined} */
			let routifyVitePluginFunctionCall;
			for (const element of pluginsList.elements) {
				if (!element) continue;
				if (element.type !== "CallExpression") continue;
				if (element.callee.type !== "Identifier") continue;
				if (element.callee.name !== routifyVitePluginImportedAs) continue;
				routifyVitePluginFunctionCall = element;
			}

			// Add an @roxi/routify/vite-plugin() call to the Vite plugins list if missing
			if (!routifyVitePluginFunctionCall) {
				routifyVitePluginFunctionCall = {
					type: "CallExpression",
					callee: {
						type: "Identifier",
						name: routifyVitePluginImportedAs,
					},
					arguments: [],
					optional: false,
				};

				pluginsList.elements.unshift(routifyVitePluginFunctionCall);
			}
		},
		updateJavaScript,
		folderInfo,
	});

	if (folderInfo.kit) {
		throw new Error("the Routify adder doesn't support SvelteKit yet (because this is a work in progress)");
	} else {
		await updateSvelte({
			path: "/src/App.svelte",
			async markup({ domhandler }) {
				const root = /** @type {import("domhandler").Element}*/ (/** @type {unknown} */ (domhandler));

				prependChild(
					root,
					new Element("Router", {
						routes: "{routes}",
					}),
				);
				prependChild(root, new Text("\n"));
				prependChild(root, new Comment(" Remove the rest of this file's contents after the router: "));

				return { domhandler };
			},
			async script({ lang, typeScriptEstree }) {
				addImport({ cjs: false, default: "routes", package: "../.routify/routes.default.js", typeScriptEstree });
				addImport({ cjs: false, named: { Router: "Router" }, package: "@roxi/routify", typeScriptEstree });

				return {
					lang,
					typeScriptEstree,
				};
			},
		});

		await updateSvelte({
			path: "/src/routes/index.svelte",
			async markup({ domhandler }) {
				const root = /** @type {import("domhandler").Element}*/ (/** @type {unknown} */ (domhandler));

				appendChild(root, new Element("h1", {}, [new Text("Routify 3 App")]));
				appendChild(root, new Element("p", {}, [new Text("This is the index page.")]));
				appendChild(root, new Element("a", { href: "/test" }, [new Text("Go to test!")]));

				return { domhandler };
			},
		});

		await updateSvelte({
			path: "/src/routes/test.svelte",
			async markup({ domhandler }) {
				const root = /** @type {import("domhandler").Element}*/ (/** @type {unknown} */ (domhandler));

				appendChild(root, new Element("h1", {}, [new Text("Routify 3 App")]));
				appendChild(root, new Element("p", {}, [new Text("This is the test page.")]));
				appendChild(root, new Element("a", { href: "/" }, [new Text("Go to index!")]));

				return { domhandler };
			},
		});
	}

	await install({ package: "@roxi/routify" });
};
