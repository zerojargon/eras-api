const category = require('./category');
const categoryProduct = require('./categoryProduct');
const product = require('./product');
const user = require('./user');

// build relationships
category.belongsToMany(product, { through: categoryProduct });
product.belongsToMany(category, { through: categoryProduct });

module.exports = {
  category,
  categoryProduct,
  product,
  user
};
