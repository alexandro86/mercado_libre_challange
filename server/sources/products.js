const axios = require("axios").default;
const _ = require("lodash");

const base = "https://api.mercadolibre.com/sites/MLA/search?q=";
const sort = "&sort=sortId&limit=4";

///items?search=xxx
//https://api.mercadolibre.com/sites/MLA/search?q=LaptopAsus&sort=sortName&limit=4
/**
 * Return a result of query all items over api
 * @param {options} of request, it could be an url or an object
 */
async function getProducts(clientUrl) {
  const data = await (
    await axios.get(BuildUrl(base, CreateFilter(clientUrl), sort))
  ).data;
  const result = GetResult(data);
  return result;
}

function CreateFilter(str) {
  const filter = String(str).split("=");
  if (filter.length < 2) return null;
  return filter[1];
}

function BuildUrl(base, filter, sort) {
  let result = String(base) + String(filter) + String(sort);
  return result;
}

function GetResult(schema) {
  const result = {
    categories: [],
    items: []
  };

  const { available_filters } = schema;
  const temp = [];
  for (const value of available_filters) {
    temp.push(value.values);
  }
  const temp1 = _.flatten(temp);
  const ordered = temp1.sort((a, b) => {
    if (a.results > b.results) {
      return -1;
    }
    if (a.results < b.results) {
      return 1;
    }
    return 0;
  });
  result.categories = ordered.map(item => item.name);
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
  getProducts
};
