/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err, data);
    } else {
      let strData = data.toString();
      let index = strData.indexOf('\n');
      strData = strData.slice(0, index);
      callback(null, strData);
    }
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request({url: url, method: 'GET'}, (err, res, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
