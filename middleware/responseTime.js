/**
 * 请求响应时间中间件
 * 记录请求处理所需的时间，并添加X-Response-Time响应头
 */
module.exports = async function responseTime(ctx, next) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  
  // 可选：记录响应时间
  if (ms > 1000) {
    console.warn(`请求处理时间过长: ${ctx.method} ${ctx.url} - ${ms}ms`);
  }
};