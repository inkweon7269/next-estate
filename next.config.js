const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './src/styles/variables.less',
  modifyVars: {
    "@layout-body-background": "#ffffff",
    "@typography-title-margin-top": 0,
    "@typography-title-margin-bottom": 0,
  },
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    return config;
  },
});