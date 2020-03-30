const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
const https = require("https");
const base = "https://api.mercadolibre.com/sites/MLA/search?q=";
const sort = "&sort=sortId&limit=4";

///items?search=xxx
//https://api.mercadolibre.com/sites/MLA/search?q=LaptopAsus&sort=sortName&limit=4
/**
 * Return a result of query all items over api
 * @param {options} of request, it could be an url or an object
 */
function getProducts(clientUrl) {
  let chunks = [];
  const req = https.request(
    BuildUrl(base, CreateFilter(clientUrl), sort),
    res => {
      res
        .on("data", data => {
          chunks.push(data);
        })
        .on("end", () => {
          let bufferArray = Buffer.concat(chunks);
          let schema = JSON.parse(bufferArray);
          let result = GetResult(schema);
          console.log("resultado: ", result);
          myEmitter.emit("prod", result);
        });
    }
  );

  req.on("error", e => {
    console.error(e);
  });
  req.end();
}

function CreateFilter(str) {
  const filter = String(str).split("=");
  if (filter.length < 2) return null;
  return filter[1];
}

function BuildUrl(base, filter, sort) {
  let result = String(base) + String(filter) + String(sort);
  console.log("Result:", result);
  return result;
}

function GetResult(schema) {
  const result = {
    categories: [],
    item: []
  };

  const {
    available_filters: { values }
  } = schema;
  console.log("Values: ", values);
  const myValues = Array.from(values);
  for (const value of myValues) {
    const { name } = value;
    result.categories.push(name);
  }

  const { results } = schema;
  for (const item of results) {
    const {
      id,
      title,
      price,
      currency_id,
      thumbnail,
      condition,
      shipping: { free_shipping }
    } = item;
    let element = {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: price - Math.floor(price).toFixed(2)
      },
      free_shipping,
      condition,
      picture: thumbnail
    };
    result.item.push(element);
  }
  return result;
}

module.exports = {
  getProducts,
  myEmitter
};
