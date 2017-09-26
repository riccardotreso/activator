'use strict'
const auth = require('koa-basic-auth');
const Koa = require('koa');
const Router = require('koa-router');
const Loader = require('./server/loader');


const mLoader = new Loader();
const app = new Koa();
const router = new Router();

// load api

mLoader.modules_result.forEach(function(api, idx, array){
    router[api.verb.toLowerCase()](api.route, api.callback);
});


// custom 401 handling
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (401 == err.status) {
        ctx.status = 401;
        ctx.set('WWW-Authenticate', 'Basic');
        ctx.body = 'Credenziali non valide';
      } else {
        throw err;
      }
    }
  });
  

// require auth
app.use(auth({ name: 'test', pass: 'test' }));


app.use(router.routes()).use(router.allowedMethods());
/*app.use(async ctx => {
    var data = {time:new Date().getTime()}

    ctx.body = data;
});
*/

app.listen(3000, function () {
    console.log('listening on port 3000');
  });