const axios = require("axios").default;

const base = "https://api.mercadolibre.com/items";

/**
 * Return a result of query all items over api
 * @param {string} id for requested resource
 */
async function getProduct(id) {
  const data = await (await axios.get(`${base}/${id}`)).data;
  const description = await (await axios.get(`${base}/${id}/description`)).data
    .plain_text;
  const result = getResult(data, description);
  return result;
}
 /**
  * Build the response object resultant
  * @param {object} data 
  * @param {string} description 
  */
function getResult(data, description) {
  const {
    id,
    title,
    price,
    currency_id,
    condition,
    thumbnail,
    free_shipping,
    sold_quantity,
    category_id
  } = data;
  const result = {
    categories: [],
    item: {
      id,
      title,
      price: {
        amount: price,
        currency: currency_id,
        decimals: price - Math.floor(price).toFixed(2)
      },
      picture: thumbnail,
      condition,
      free_shipping,
      sold_quantity,
      description
    }
  };
  result.categories.push(category_id)
  return result;
}

module.exports = {
  getProduct
};
