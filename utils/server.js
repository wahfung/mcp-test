/**
 * 应用程序启动助手
 */
const http = require('http');

/**
 * 正常关闭应用程序的处理函数
 * @param {Object} server - HTTP服务器实例
 * @param {Object} app - Koa应用实例 
 */
function gracefulShutdown(server, app) {
  console.log('接收到终止信号，正在优雅关闭...');
  
  // 设置30秒超时
  const forcedTimeout = setTimeout(() => {
    console.error('无法在30秒内正常关闭，强制退出');
    process.exit(1);
  }, 30000);
  
  // 停止接收新请求
  server.close(() => {
    console.log('关闭HTTP服务器，所有连接已断开');
    clearTimeout(forcedTimeout);
    
    // 执行应用程序清理操作
    if (typeof app.cleanup === 'function') {
      app.cleanup().then(() => {
        console.log('应用程序清理完成');
        process.exit(0);
      }).catch(err => {
        console.error('应用程序清理失败:', err);
        process.exit(1);
      });
    } else {
      process.exit(0);
    }
  });
}

/**
 * 设置进程信号处理
 * @param {Object} server - HTTP服务器实例
 * @param {Object} app - Koa应用实例
 */
function setupProcessHandlers(server, app) {
  // 处理中断信号
  process.on('SIGINT', () => gracefulShutdown(server, app));
  
  // 处理终止信号
  process.on('SIGTERM', () => gracefulShutdown(server, app));
  
  // 处理未捕获异常
  process.on('uncaughtException', (err) => {
    console.error('未捕获异常:', err);
    gracefulShutdown(server, app);
  });
  
  // 处理未处理的Promise拒绝
  process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
  });
}

/**
 * 启动应用程序
 * @param {Object} app - Koa应用实例
 * @param {Object} config - 应用配置
 * @returns {Object} server - HTTP服务器实例
 */
function startServer(app, config) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app.callback());
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`端口 ${config.server.port} 已被占用`);
      }
      reject(err);
    });
    
    server.listen(config.server.port, config.server.hostname, () => {
      console.log(`服务器在 ${config.server.env} 环境中运行`);
      console.log(`🚀 HTTP服务器启动于: http://${config.server.hostname}:${config.server.port}`);
      
      // 设置进程信号处理
      setupProcessHandlers(server, app);
      
      resolve(server);
    });
    
    return server;
  });
}

module.exports = {
  startServer
};