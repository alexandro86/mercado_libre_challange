const axios = require("axios").default;
const base = "https://api.mercadolibre.com/items";

async function getProduct(id) {
  const data = await (await axios.get(`${base}/${id}`)).data;
  const description = await (await axios.get(`${base}/${id}/description`)).data.plain_text;
  const result = getResult(data, description);
  return result;
}

function getResult(data, description) {
  const {
    id,
    title,
    price,
    currency_id,
    condition,
    thumbnail,
    free_shipping,
    sold_quantity
  } = data;
  const result = {
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
  };
  return result;
}

module.exports = {
  getProduct
};
