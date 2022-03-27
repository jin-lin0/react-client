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
    ["@pages"]: path.join(__dirname, "./src/pages"),
    ["@components"]: path.join(__dirname, "./src/components"),
    ["@api"]: path.join(__dirname, "./src/api"),
    ["@utils"]: path.join(__dirname, "./src/utils"),
    ["@route"]: path.join(__dirname, "./src/route"),
    ["@const"]: path.join(__dirname, "./src/const"),
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#3c3265" },
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
  (config, env) => rewireReactHotLoader(config, env)
);
