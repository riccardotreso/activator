'use strict'
var fs = require('fs');
var path_module = require('path');
var path =  './api';

var HttpVerbs = ["GET", "POST", "PUT", "DELETE"];

var loader = function(){
    var self = this;
    self.modules_result = [];
    function loadModules(path) {
        let stat = fs.lstatSync(path);

        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            let files = fs.readdirSync(path);
            let f, l = files.length;
            for (var i = 0; i < l; i++) {
                f = path_module.join(path, files[i]);
                loadModules(f);
            }
        } else {
            let loadedModule = require('../'+path);
            let listOfProperties = Object.getOwnPropertyNames(loadedModule);
            let urlApi = path.toLocaleLowerCase();
            urlApi = urlApi.replace(path_module.extname(path), "");
            urlApi = urlApi.replace(/\\/g, "/");

            HttpVerbs.forEach(function(verb, idx){
                var moduleVerb = loadedModule[verb];
                if(moduleVerb){
                    let listOfProperties = Object.getOwnPropertyNames(moduleVerb);
                    listOfProperties.forEach(function (property, index, array){
                        if(typeof(moduleVerb[property]) === "function"){
                            self.modules_result.push({
                                verb: verb,
                                route: '/'+ urlApi + '/'+ property.toLowerCase(),
                                callback: moduleVerb[property] 
                            });
                        }
                    });
                }
            })
        }        
    };

    loadModules(path);
};

module.exports = loader;










