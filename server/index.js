const express = require('express');
const dbhelper = require('../database')
const helper = require('../helpers/github')


let app = express();
app.use(express.static('./client/dist'))
app.use(express.json());
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helper.getReposByUsername(req.body.term, ((err, results) => {
    if(err) {
      console.log('Post Error:', err)
    } else {
      console.log("Request successful!")
      let arr = results.data.map((repo) => {
        return ({
          repo_id: repo.id,
          name: repo.name,
          repo_owner: repo.owner.login,
          size: repo.size,
          stargazers_count: repo.stargazers_count,
          forks: repo.forks_count,
          html_url: repo.html_url
        })
      })
      dbhelper.save(arr)
    }
  }))
});

app.get('/repos', function (req, res) {
  dbhelper.findRepos((err, results) => {
    if(err) {
      throw err
    } else {
      console.log("THIS IS TOP 25 REPOS:", results)
      res.send(results)
    }
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//Posts data to the database
