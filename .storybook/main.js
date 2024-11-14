/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  // stories: [
  //   "../stories/**/*.mdx",
  //   "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  // ],
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  // stories: [
  //   {
  //     // 👇 Sets the directory containing your stories
  //     directory: '../stories',
  //     // 👇 Storybook will load all files that match this glob
  //     files: '*.stories.*',
  //     // 👇 Used when generating automatic titles for your stories
  //     titlePrefix: 'MyComponents',
  //   },
  // ],
  staticDirs: ["../public"],
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
