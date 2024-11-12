/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      rules: [
        // Replaces any existing Sass rules with given rules
        {
          test: /\.less$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "less-loader",
              options: { implementation: require.resolve("less") },
            },
          ],
        },
      ],
    },
  },
  webpackFinal: async (config) => {
    const lessLoaderChain = {
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        },
      ],
    };
    const oneOfRule = config.module.rules.find((rule) => !!rule.oneOf);
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(lessLoaderChain);
    } else {
      config.module.rules.unshift(lessLoaderChain);
    }

    return config;
  },
};
export default config;
