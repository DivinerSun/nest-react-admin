const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
