/**
 * 统一的中间件加载器
 * 集中管理所有应用程序中间件
 */
const errorHandler = require('./errorHandler');
const responseTime = require('./responseTime');

module.exports = {
  /**
   * 应用所有中间件到Koa应用
   * @param {Koa} app - Koa应用实例
   * @param {Object} config - 应用配置
   */
  apply: function(app, config) {
    // 错误处理应该是第一个中间件，以捕获所有异常
    app.use(errorHandler);
    
    // 请求计时
    app.use(responseTime);
    
    // 返回中间件列表，以供调试使用
    return [
      'errorHandler',
      'responseTime'
    ];
  }
};