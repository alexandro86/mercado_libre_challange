const axios = require("axios").default;
const { GetCategories, author } = require("./common");

const base = "https://api.mercadolibre.com/sites/MLA/search?q=";
const sort = "&sort=sortId&limit=4";

/**
 * Return a result of query all items over api
 * @param {url} clientUrl request, it could be an url or an object
 */
async function getProducts(clientUrl) {
  let data;
  try {
    data = await (
      await axios.get(BuildUrl(base, CreateFilter(clientUrl), sort))
    ).data;
  } catch (error) {
    console.log(error);
  }
  const result = GetResult(data);
  return result;
}

/**
 * this method isolate the string which become in filter for url params
 * @param {string} str
 * @returns a filter
 */
function CreateFilter(str) {
  const filter = String(str).split("=");
  if (filter.length < 2) return null;
  return filter[1];
}

/**
 * This method build a url fiting tree parts of it
 * @param {string} base url base not change
 * @param {string} filter is a parameter to find something
 * @param {string} sort is a url parameter to sort the search
 */
function BuildUrl(base, filter, sort) {
  let result = String(base) + String(filter) + String(sort);
  return result;
}

/**
 * This method normalize the data in readable data for frontend
 * @param {object} data input data which coming from ml server
 */
function GetResult(data) {
  let result = {
    categories: [],
    items: []
  };
  // got categories
  result.categories = GetCategories(data);

  const { results } = data;
  // got items
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
  result = { author, ...result };
  return result;
}

module.exports = {
  getProducts
};
