import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const RepoListRender = (props) => {
  if(props) {

    return (
      <div className="repos-list">
        {props.repos.map((repo) => {
          return (
            <RepoEntry repo={repo}/>
          )
        })}
      </div>
    )
  }

}

export default RepoListRender