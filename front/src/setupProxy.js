var { createProxyMiddleware } = require('http-proxy-middleware');

var proxy = {
   target: 'http://localhost:3001',
   changeOrigin: true,
};

module.exports = function (app) {
   app.use('/assets', createProxyMiddleware(proxy));
   app.use('/api', createProxyMiddleware(proxy));
   app.use('/auth', createProxyMiddleware(proxy));
};
