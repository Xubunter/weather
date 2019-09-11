const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const mount = require('koa-mount');
const { citySearch } = require('./citySearch');
const { getImg } = require('./modules/image');

const mainServer = new Koa();

const app = new Koa();
const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 80;
server.use(serve('assets'));

app.use(serve('./public'))

server
  .use(router.routes())
  .use(router.allowedMethods());

router
  .get('/', (ctx, next) => {
    ctx.redirect('/app/');
  })
  .get('/city', (ctx, next) => {
    ctx.body = citySearch(ctx.query.input);
  })
  //.get('/bg/:id', (ctx, next) => {
  //  ctx.redirect(`/api/bg${ctx.params.id}.jpg`);
  //})
  .get('/bg', (ctx, next) => {
    const imgUrl = getImg('bg', ctx.params.prev);
    ctx.body = `/api/${imgUrl}`;
  })


mainServer.use(mount('/', app));
mainServer.use(mount('/api', server));

mainServer.listen(PORT);
