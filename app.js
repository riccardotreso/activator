'use strict'
const auth = require('koa-basic-auth');
const Koa = require('koa');
const Router = require('koa-router');
const Loader = require('./server/loader');


const mLoader = new Loader();
const app = new Koa();
const router = new Router();

const basicAuth = {
    name:"test", 
    password:"test"
};
const lPort = 3000;

// load api

mLoader.modules_result.forEach(function(api, idx, array){
    router[api.verb.toLowerCase()](api.route, api.callback);
    console.log("Exposing HTTP %s %s",api.verb, api.route);
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
app.use(auth({ name: basicAuth.name, pass: basicAuth.password }));

// routing
app.use(router.routes()).use(router.allowedMethods());


app.listen(lPort, function () {
    console.log('Listening on port %d', lPort);
    console.log("Basic Auth: UserName: %s, Password: %s", basicAuth.name, basicAuth.password);
  });