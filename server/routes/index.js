var express = require("express");
var router = express.Router();
const cors = require("cors");

const { options, getProducts, myEmitter } = require("../sources/index");
///items?search=xxx
/* GET home page. */
router.get("/items", cors(), async function(req, res, next) {
  const data = await getProducts(req.originalUrl);
  console.log('Data: ', data)
  res.send(data)
});


module.exports = router;
