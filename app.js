const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser());
app.use(logger());

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      message: err.message || 'Internal Server Error'
    };
    ctx.app.emit('error', err, ctx);
  }
});

// Routes
router.get('/', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Welcome to the Koa API',
    data: {
      timestamp: new Date(),
      info: 'This is a basic Koa.js application'
    }
  };
});

// Health check endpoint
router.get('/health', (ctx) => {
  ctx.body = {
    status: 'UP',
    timestamp: new Date()
  };
});

// API routes
router.get('/api/v1/hello', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Hello, World!'
  };
});

router.post('/api/v1/echo', (ctx) => {
  const data = ctx.request.body;
  ctx.body = {
    success: true,
    message: 'Echo response',
    data: data
  };
});

// Register routes
app.use(router.routes());
app.use(router.allowedMethods());

// Global error handler
app.on('error', (err, ctx) => {
  console.error('Server Error:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;