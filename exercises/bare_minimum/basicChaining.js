/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  var promisifiedWriteFile = Promise.promisify(fs.writeFile);

  return pluckFirstLineFromFileAsync(readFilePath)
    .then((body) => {
      if (body.message) {
        throw new Error('Failed to get GitHub profile: ' + body.message);
      } else {
        return body;
      }
    })
    .then((username) => (getGitHubProfileAsync(username) ) )
    .then((response) => ( promisifiedWriteFile(writeFilePath, JSON.stringify(response)) ) );

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
