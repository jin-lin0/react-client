const {
  override,
  addWebpackPlugin,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const rewireReactHotLoader = require("react-app-rewire-hot-loader");
const path = require("path");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = override(
  addWebpackAlias({
    ["@"]: path.join(__dirname, "./src"),
    ["@components"]: path.join(__dirname, "./src/components"),
    ["@api"]: path.join(__dirname, "./src/api"),
    ["@utils"]: path.join(__dirname, "./src/utils"),
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  (config, env) => rewireReactHotLoader(config, env)
);
