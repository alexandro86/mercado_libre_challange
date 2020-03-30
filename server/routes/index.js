var express = require("express");
var router = express.Router();
const cors = require('cors')


const { options, getProducts, myEmitter } = require("../sources/index");
///items?search=xxx
/* GET home page. */
router.get("/items", cors(), function(req, res, next) {
  getProducts(req.originalUrl)
  myEmitter.on('prod', data => res.send(data))
});

// router.get("/products", function(req, res, next) {
  
// });

module.exports = router;
