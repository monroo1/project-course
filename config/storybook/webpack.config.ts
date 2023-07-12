import path from "path";
import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { BuildPaths } from "../build/types/config";
import { buildCssLoader } from "../build/loaders/buildCssLoader";

export default ({ config }: { config: webpack.Configuration }) => {
	const paths: BuildPaths = {
		build: "",
		html: "",
		entry: "",
		src: path.resolve(__dirname, "..", "..", "src"),
	};

	config.resolve = {
		extensions: [".tsx", ".ts", ".js"],
		preferAbsolute: true,
		modules: [paths.src, "node_modules"],
		mainFiles: ["index"],
		alias: {},
	};

	// @ts-ignore
	config.module!.rules = config.module?.rules?.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/ };
		}

		return rule;
	});

	config.module!.rules!.push({
		test: /\.svg$/,
		use: ["@svgr/webpack"],
	});
	config.module!.rules!.push(buildCssLoader(true));

	config.plugins!.push(
		new DefinePlugin({
			__IS_DEV__: true,
			__API__: JSON.stringify(""),
			__PROJECT__: JSON.stringify("storybook"),
		}),
	);

	return config;
};
