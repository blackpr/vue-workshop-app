const loadFiles = require("./src/load-files");
const webpack = require("webpack");

const workshopFiles = loadFiles();

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
  // runtimeCompiler: true,
  chainWebpack: (config) => {
    config.module
      .rule("html")
      .test(/(exercise|final).*\.html$/)
      .use("html-loader")
      .loader("html-loader")
      .end();

    config.module
      .rule("md")
      .test(/\.md$/)
      .use("html")
      .loader("html-loader")
      .end()
      .use("markdown")
      .loader("markdown-loader")
      .end();
  },
  configureWebpack: () => {
    return {
      plugins: [
        new webpack.DefinePlugin({
          WORKSHOP_FILES: JSON.stringify(workshopFiles),
        }),
      ],
    };
  },
};
