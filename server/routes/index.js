var express = require("express");
var router = express.Router();
const cors = require('cors')


const { options, getProducts, myEmitter } = require("../sources/index");

/* GET home page. */
router.get("/", cors(), function(req, res, next) {
  myEmitter.on('prod', data => res.send(data))
  getProducts(options)
});

// router.get("/products", function(req, res, next) {
  
// });

module.exports = router;
