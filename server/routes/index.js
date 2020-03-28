var express = require("express");
var router = express.Router();
const {emitters} = require('../emitters/index')

const { options, getProducts, myEmitter } = require("../sources/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  myEmitter.on('prod', data => console.log('data:', data))
  getProducts(options)
  res.render("index", { title: "Express" });
});

// router.get("/products", function(req, res, next) {
  
// });

module.exports = router;
