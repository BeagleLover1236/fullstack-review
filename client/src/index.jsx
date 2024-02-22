import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListRender from './components/RepoListRender.jsx';
const axios = require('axios')

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    console.log(`${term} was searched`);

    axios.post('/repos', {term})
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

    axios.get("/repos")
    .then((result) => {
      setRepos(result.data)
    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
    setIsRefreshed(true)
  }

  useEffect(() => {
    axios.get("/repos")
    .then((result) => {

      setRepos(result.data)
      console.log("REPOS:", result.data)

    })
    .catch((err) => {
      if(err) {
        throw err;
      }
    })
  }, [])

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
      <RepoListRender repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));