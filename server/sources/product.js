const axios = require("axios").default;
const { author } = require("./common");
const base = "https://api.mercadolibre.com/items";
const baseCategory = "https://api.mercadolibre.com/categories";
/**
 * Get inicial data of the resource
 * @param {string} id for requested resource
 */
async function getData(id) {
  let data;
  try {
    data = await (await axios.get(`${base}/${id}`)).data;
  } catch (error) {
    console.log(error);
  }
  return data;
}

/**
 * Get the description of the resource
 * @param {string} id
 */
async function getDescription(id) {
  let description;
  try {
    description = await (await axios.get(`${base}/${id}/description`)).data
      .plain_text;
  } catch (error) {
    console.log(error);
  }
  return description;
}

/**
 * Get category of the resource
 * @param {string} id
 */
async function getCategory(id) {
  let category;
  try {
    category = await (await axios.get(`${baseCategory}/${id}`)).data.name;
  } catch (error) {
    console.log(error);
  }
  return category;
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
    author,
    category_id,
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
  return result;
}

/**
 * Id of the query resource
 * @param {string} id
 */
async function getProduct(id) {
  const result = getResult(await getData(id), await getDescription(id));
  const category = await getCategory(result.category_id);
  result["category"] = category;
  return result;
}

module.exports = {
  getProduct
};
