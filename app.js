const database = require('./api/database');
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./api/routes/index');
const users = require('./api/routes/users');
const posts = require('./api/routes/posts');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500
  }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/posts', posts.routes(), posts.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;
