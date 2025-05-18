/**
 * MCP-Test Koa.js 应用
 * 主应用程序入口文件
 */

// 依赖项引入
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');

// 内部模块引入
const config = require('./config');
const middleware = require('./middleware');
const { applyRoutes } = require('./routes');
const { startServer } = require('./utils/server');

// 创建Koa应用实例
const app = new Koa();

// 应用名称和版本，用于调试
app.name = config.app.name;
app.version = config.app.version;

/**
 * 应用初始化
 */
async function initApp() {
  // 设置应用上下文属性
  app.context.config = config;
  
  // 应用安全中间件
  if (config.security.helmet.enabled) {
    app.use(helmet());
  }
  
  // 配置CORS
  if (config.cors.enabled) {
    app.use(cors({
      allowMethods: config.cors.allowMethods,
      allowHeaders: config.cors.allowHeaders,
      exposeHeaders: config.cors.exposeHeaders,
      maxAge: config.cors.maxAge,
    }));
  }
  
  // 应用基础中间件
  app.use(bodyParser());
  app.use(logger());
  
  // 应用自定义中间件
  middleware.apply(app, config);
  
  // 应用路由
  applyRoutes(app, config);
  
  // 错误事件处理
  app.on('error', (err, ctx) => {
    console.error('服务器错误:', err);
  });
  
  // 添加清理方法
  app.cleanup = async () => {
    // 这里可以添加资源清理代码，如关闭数据库连接等
    console.log('执行应用程序清理操作...');
    return Promise.resolve();
  };
  
  return app;
}

/**
 * 启动应用程序
 */
async function bootstrap() {
  try {
    await initApp();
    const server = await startServer(app, config);
    return { app, server };
  } catch (error) {
    console.error('启动应用程序时出错:', error);
    process.exit(1);
  }
}

// 如果这个文件是直接运行的，则启动应用
if (require.main === module) {
  bootstrap().then(({ app, server }) => {
    console.log(`${app.name} v${app.version} 启动成功!`);
  });
}

// 导出应用实例，用于测试或其他目的
module.exports = app;