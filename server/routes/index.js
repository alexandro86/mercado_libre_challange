var express = require("express");
var router = express.Router();

const { options, getProducts } = require("../sources/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/products", function(req, res, next) {
  const products = getProducts(options);
  console.log(products)
  res.send(products)
});

module.exports = router;
