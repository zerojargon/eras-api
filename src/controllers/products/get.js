const { category, product } = require('../../models');

module.exports = (request, reply) => {
  const output = product.findAll({ include: [
    { model: category }
  ]});

  reply(output);
}
