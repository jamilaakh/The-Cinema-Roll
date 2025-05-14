const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { ORDERS_API_URL, PRODUCTS_API_URL } = require('./URLs');

const app = express();
const port = 3000;

// Proxy configuration
const optionsOrders = {
  target: ORDERS_API_URL,
  changeOrigin: true,
  logger: console,
};

const optionsProducts = {
  target: PRODUCTS_API_URL,
  changeOrigin: true,
  logger: console,
};

// Proxies
const ordersProxy = createProxyMiddleware(optionsOrders);
const productsProxy = createProxyMiddleware(optionsProducts);

// Routes
app.get('/', (req, res) => res.send('Hello Gateway API!'));
app.use('/orders', ordersProxy);
app.use('/products', productsProxy);

// Start server
app.listen(port, () => console.log(`API Gateway listening on port ${port}`));