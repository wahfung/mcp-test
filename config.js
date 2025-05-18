/**
 * 应用程序配置
 */
module.exports = {
  // 服务器设置
  server: {
    port: process.env.PORT || 3000,
    hostname: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development',
  },
  
  // 应用程序设置
  app: {
    name: 'MCP-Test API',
    version: '1.0.0',
    apiPrefix: '/api/v1',
  },
  
  // 跨域设置
  cors: {
    enabled: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id'],
    maxAge: 86400, // 24小时
  },
  
  // 日志设置
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    enabled: true,
  },
  
  // 安全设置
  security: {
    rateLimiting: {
      enabled: true,
      max: 300, // 每个IP每windowMs允许的最大请求数
      windowMs: 15 * 60 * 1000, // 15分钟
    },
    helmet: {
      enabled: true,
    },
  },
};