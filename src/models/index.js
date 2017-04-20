const category = require('./category')
const image = require('./image')
const product = require('./product')
const user = require('./user')

const categoryProduct = require('./categoryProduct')
const imageProduct = require('./imageProduct')

// build relationships
category.belongsToMany(product, { through: categoryProduct, as: 'product' })
product.belongsToMany(category, { through: categoryProduct, as: 'category' })

image.belongsToMany(product, { through: imageProduct, as: 'product' })
product.belongsToMany(image, { through: imageProduct, as: 'image' })

module.exports = {
  category,
  categoryProduct,
  image,
  imageProduct,
  product,
  user
}
