/**
 * 路由加载器
 * 集中管理所有应用路由
 */
const Router = require('koa-router');
const apiV1Routes = require('./api-v1');

const router = new Router();

/**
 * 基础路由
 */

/**
 * @api {get} / 获取API欢迎消息
 * @apiName GetWelcome
 * @apiGroup Common
 * @apiVersion 1.0.0
 */
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

/**
 * @api {get} /health 健康检查端点
 * @apiName GetHealth
 * @apiGroup System
 * @apiVersion 1.0.0
 */
router.get('/health', (ctx) => {
  ctx.body = {
    status: 'UP',
    timestamp: new Date()
  };
});

/**
 * 加载所有路由
 * @param {Object} app - Koa应用实例
 * @param {Object} config - 应用配置
 */
function applyRoutes(app, config) {
  // 挂载API v1路由
  router.use(config.app.apiPrefix, apiV1Routes.routes(), apiV1Routes.allowedMethods());
  
  // 挂载根路由
  app.use(router.routes());
  app.use(router.allowedMethods());
  
  return router;
}

module.exports = { 
  router,
  applyRoutes
};