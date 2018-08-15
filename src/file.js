const fs = require('fs');

class File {
  async readFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf8', (err, file) => {
        if (err) { reject(err); }
        resolve(file);
      });
    });
  }
};

module.exports = File;