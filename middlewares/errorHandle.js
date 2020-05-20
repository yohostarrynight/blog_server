const errorHandle = (async (ctx,next) => {
  return next().catch((err) => {
    if(err.status === 401) {
      ctx.status = 401;
      ctx.body = {
	error: err.message
      }
    } else {
      throw err;
    }
  })
});

module.exports = errorHandle;

