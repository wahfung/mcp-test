/**
 * Global error handling middleware
 */
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // Set status code
    ctx.status = err.statusCode || err.status || 500;
    
    // Set response body
    ctx.body = {
      success: false,
      error: {
        code: ctx.status,
        message: err.message || 'Internal Server Error'
      }
    };
    
    // Log error
    console.error('Error handling request:', err);
    
    // Emit event for centralized error logging
    ctx.app.emit('error', err, ctx);
  }
};