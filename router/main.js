var index = require('./index');
var give_item = require('./api/give_item');
var callback = require('./callback');


module.exports =
/**
 * @param {import("express").Application} app 
 */
async app => {
    app[index.method](index.route, index.router);
    app[give_item.method](give_item.route, give_item.router);
    app[callback.method](callback.route, callback.router);
}