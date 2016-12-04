const { category, product } = require('../../models');

module.exports = (request, reply) => {
  product.findOne({
    where: {
      id: request.params.productId
    }
  }).then(productToUpdate => {
    productToUpdate.stockCode = request.payload.stockCode || productToUpdate.stockCode;
    productToUpdate.name = request.payload.name || productToUpdate.name;
    productToUpdate.price = request.payload.price || productToUpdate.price;
    productToUpdate.discountedPrice = request.payload.discountedPrice || productToUpdate.discountedPrice;
    productToUpdate.description = request.payload.description || productToUpdate.description;
    productToUpdate.primaryImageId = request.payload.primaryImageId || productToUpdate.primaryImageId;
    productToUpdate.width = request.payload.width || productToUpdate.width;
    productToUpdate.height = request.payload.height || productToUpdate.height;
    productToUpdate.depth = request.payload.depth || productToUpdate.depth;
    productToUpdate.publishedAt = request.payload.publishedAt || productToUpdate.publishedAt;

    productToUpdate.save().then(savedProduct => {
      reply(savedProduct);
    });
  })
}
