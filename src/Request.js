var request = require('request');
// Start the request
module.exports = (res, options, callback) => {
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        callback(body);
    } else {
      console.log(error);
      console.log(response);
    }
  });
}
