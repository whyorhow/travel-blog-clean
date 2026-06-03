const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * CRA dev server does not run /api routes. Proxy to `vercel dev` when testing locally:
 *   Terminal 1: npx vercel dev
 *   Terminal 2: npm start  (with CONTACT_API_PROXY in .env.development.local)
 */
module.exports = function setupProxy(app) {
  const target = process.env.CONTACT_API_PROXY;
  if (!target) return;

  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};
