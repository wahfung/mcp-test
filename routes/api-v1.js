/**
 * API v1路由
 */
const Router = require('koa-router');
const router = new Router();

/**
 * @api {get} /api/v1/hello 获取欢迎消息
 * @apiName GetHello
 * @apiGroup Common
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 响应消息
 *
 * @apiSuccessExample {json} 成功响应:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Hello, World!"
 *     }
 */
router.get('/hello', (ctx) => {
  ctx.body = {
    success: true,
    message: 'Hello, World!'
  };
});

/**
 * @api {post} /api/v1/echo 回显请求数据
 * @apiName PostEcho
 * @apiGroup Common
 * @apiVersion 1.0.0
 *
 * @apiParam {Object} body 请求体将被回显
 *
 * @apiSuccess {Boolean} success 请求是否成功
 * @apiSuccess {String} message 响应消息
 * @apiSuccess {Object} data 回显的请求数据
 *
 * @apiSuccessExample {json} 成功响应:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": "Echo response",
 *       "data": {
 *         "example": "value"
 *       }
 *     }
 */
router.post('/echo', (ctx) => {
  const data = ctx.request.body;
  ctx.body = {
    success: true,
    message: 'Echo response',
    data: data
  };
});

module.exports = router;