const category = require('./category');
const image = require('./image');
const product = require('./product');
const user = require('./user');

const categoryProduct = require('./categoryProduct');
const imageProduct = require('./imageProduct');

// build relationships
category.belongsToMany(product, { through: categoryProduct });
product.belongsToMany(category, { through: categoryProduct });

image.belongsToMany(product, { through: imageProduct });
product.belongsToMany(image, { through: imageProduct });

module.exports = {
  category,
  categoryProduct,
  image,
  imageProduct,
  product,
  user
};
