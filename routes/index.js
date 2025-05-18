const Router = require('koa-router');
const router = new Router();

// Basic routes
router.get('/status', (ctx) => {
  ctx.body = { status: 'running', time: new Date() };
});

// Import other route modules here
// const userRoutes = require('./user.routes');
// router.use('/users', userRoutes.routes(), userRoutes.allowedMethods());

module.exports = router;