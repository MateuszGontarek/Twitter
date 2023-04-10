const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/api/users", "/api/login/user", "/api/twits",  "/api/twits-comment", 
    "/api/twits-like", "/api/users/update"],
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
