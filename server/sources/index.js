const axios = require("axios").default;


const base = "https://api.mercadolibre.com/sites/MLA/search?q=";
const sort = "&sort=sortId&limit=4";


///items?search=xxx
//https://api.mercadolibre.com/sites/MLA/search?q=LaptopAsus&sort=sortName&limit=4
/**
 * Return a result of query all items over api
 * @param {options} of request, it could be an url or an object
 */
async function getProducts(clientUrl) {
  const buffer = await (await axios.get(BuildUrl(base, CreateFilter(clientUrl), sort))).data;
  const result = GetResult(buffer);
  return result;
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
    items: []
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
    result.items.push(element);
  }
  return result;
}

module.exports = {
  getProducts,
};
