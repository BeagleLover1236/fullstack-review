const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/githubfetch', { useNewUrlParser: true,  useUnifiedTopology: true}, (err) => {
  if(err) {
    throw err;
  } else {
    console.log('Database Connected!')
  }
})



let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  name: {
    type: String,
    unique: true
  },
  repo_owner: String,
  size: Number,
  stargazers_count: Number,
  forks: Number,
  html_url: String
});

let Repo = mongoose.model('Repo', repoSchema);
Repo.createCollection()

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.insertMany(repos, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Yay!')
    }
  })
}

let findRepos = (callback) => {
  Repo.find((err, results) => {
    if(err) {
      callback(err, null)
    } else {
      console.log("PLEASE:", results)
      callback(null, results)
    }
  })
  .sort({size: -1})
  .limit(25)
}




module.exports.save = save;
module.exports.findRepos = findRepos