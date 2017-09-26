'use strict'
var _ = require('lodash');


module.exports = {
    GET: {
        // GET: /api/v1/configuration/getutentebyid
        getutentebyid: function(ctx, next){
            
            var data = {time:new Date().getTime(), api: ctx.path, lodashVersion: _.VERSION};
            ctx.body = data;
        
        }
    },
    POST:{
        // POST: /api/v1/configuration/getutentebyname
        getutentebyname: function(ctx, next){
            var data = {time:new Date().getTime(), api: ctx.path, lodashVersion: _.VERSION};
            ctx.body = data;
        }
    } 
};
