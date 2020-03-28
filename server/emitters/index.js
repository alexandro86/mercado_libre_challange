const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

let emitters = {};

function initEmitters() {
  emitters = {
    productEmitter: new MyEmitter()
  };
}

exports.initEmitters = initEmitters;
exports.emitters = emitters;
