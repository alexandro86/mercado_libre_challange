const _ = require("lodash");

function GetCategories(schema) {
  const { available_filters } = schema;
  const tempCollection = [];
  for (const value of available_filters) {
    tempCollection.push(value.values);
  }
  const finalCollection = _.flatten(tempCollection);
  const orderedCollection = finalCollection.sort((before, after) => {
    if (before.results > after.results) {
      return -1;
    }
    if (before.results < after.results) {
      return 1;
    }
    return 0;
  });
  return orderedCollection.map(item => item.name);
}

const author = {
  name: "Alejandro",
  lastname: "Gonzalez"
};

module.exports = {
  GetCategories,
  author
};
