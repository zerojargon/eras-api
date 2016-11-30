const { category, product } = require('../../models');

module.exports = (request, reply) => {
  const output = product.findOne({
    include: [
      { model: category }
    ],
    where: { id: request.params.productId }
  });

  reply(output);
}
