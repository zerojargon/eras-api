const { user } = require('../../models');
const { auth } = require('../../utils');

module.exports = (request, reply) => {

  const hashedAuth = auth.encrypt(request.payload.password);

  user.create({
    email: request.payload.email,
    password: hashedAuth.stringHash,
    salt: hashedAuth.salt
  }).then(newUser => {
    reply(newUser)
  }).catch(err => {
    reply(err);
  });

}
