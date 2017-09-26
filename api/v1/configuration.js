
var mongodb = require('mongodb').MongoClient;


module.exports = {
    GET: {
        // GET: /api/v1/configuration/getConfiguration
        getConfiguration: function(ctx, next){
            return new Promise(function(resolve, reject){
                var response = {
                    apiEndPoint: "https://example.com"
                };
                resolve(response);
              })
              .then(function(result) {
                ctx.body = result;
              });  
        },
        // GET: /api/v1/configuration/updateTransfer
        updateTransfer: function(ctx, next){
            return new Promise(function(resolve, reject){
                _doUpdate(function(result){
                    resolve(result);
                });
                
              })
              .then(function(result) {
                ctx.body = result;
              });  
            
        }
    } 
};

function _doUpdate(callback){
    setTimeout(function(){
        callback({item:50});
    }, 500)


};


