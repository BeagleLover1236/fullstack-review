const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };


axios.get(options.url, options.headers)
.then((response) => {
  callback(null, response)
})
.catch((err) => {
  callback(err, null)
})

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

}

module.exports.getReposByUsername = getReposByUsername;