const { image, product } = require('../../models');
const { file } = require('../../utils');
const path = require('path');
const Boom = require('boom');
const Promise = require('bluebird');
const appDir = path.dirname(require.main.filename);

const addImages = function(request, originalProduct) {
  return new Promise(function(resolve, reject) {

    const images = request.payload.images;
    if (!images || images.length === 0) {
      resolve(originalProduct);
    }

    const incrementUploadedFiles = function() {
      uploadedFiles++;
      if (uploadedFiles === images.length) {
        product.findOne({
          include: [{
            model: image,
            as: 'image'
          }],
          where: { id: originalProduct.id }
        }).then(productWithImages => {
          resolve(productWithImages);
        }).catch(err => reject(Boom.badImplementation('Could not retrieve saved product' + err)));
      }
    };

    let uploadedFiles = 0;
    console.log(originalProduct.id);
    for (const imageUpload of images) {
      image.create().then(createdImage => {
        createdImage.addProduct(originalProduct.id)
          .then(linkedProduct => {
            const name = `${createdImage.id}-original`;
            const filepath = appDir + "/storage/" + name;
            file.save(filepath, imageUpload, function(err) {
              if (err) {
                reject(Boom.badImplementation(err));
              } else {
                incrementUploadedFiles();
              }
            });
          })
          .catch(err => {
            reject(Boom.badImplementation('Could not add products to image ' + createdImage.id, err));
          });
        }).catch(err => console.error(err));
    }
  });
};

const addCategories = function(request, originalProduct) {
  return new Promise(function(resolve, reject) {
    const categories = request.payload.categoryIds;
    if (!categories) {
        resolve(originalProduct);
    }
    originalProduct.addCategory(categories)
      .then(linkedProduct => {
        resolve(originalProduct);
      })
      .catch(err => {
        reject(Boom.badImplementation('Could not add categories to product ' + originalProduct.id));
      });
  });
}

module.exports = (request, reply) => {
  product.create(request.payload)
    .then(createdProduct => {
      // add images
      createdProduct = addImages(request, createdProduct)
        // add categories
        .then( addCategories.bind(null, request) )
        .then( function(res) {
          console.log('---', res);
          reply(res);
        });
    })
    .catch(err => {
      reply(Boom.badImplementation('Could not create product'));
    });
}
