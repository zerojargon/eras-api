const fs = require('fs');

module.exports = {
  save: function(path, data, callback = null) {
    const file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err);
    });

    data.pipe(file);

    data.on('end', function (err) {
      callback.call(err);
    });
  }
};
