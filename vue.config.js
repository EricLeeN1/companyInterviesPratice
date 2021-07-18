const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/",
  assetsDir: "static",
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "": "/api",
        },
      },
    },
  },
};
