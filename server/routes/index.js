var express = require("express");
var router = express.Router();
const cors = require("cors");

const { getProducts } = require("../sources/products");
const { getProduct }  = require("../sources/product")
///items?search=xxx
/* GET home page. */
router.get("/items", cors(), async function(req, res, next) {
  const data = await getProducts(req.originalUrl);
  res.send(data)
});

router.get("/products/:id", cors(), async function(req, res, next) {
  console.log("param", req.params.id)
  const data = await getProduct("MLA824302062")
  res.send(data)
});


module.exports = router;
