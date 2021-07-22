const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/v1/get", {
            target: "http://localhost:2601", //프록시 할 주소
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader("Origin", "http://localhost:2601");
            },
            changeOrigin: true,
        })
    );
};
