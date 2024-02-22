import React from 'react';

const RepoEntry = (props) => {

  return (
    <div className="entry">
      <a href={props.repo.html_url}>
        <p>Repo name: {props.repo.name}</p>
      </a>
      <p>Size: {props.repo.size}</p>
    </div>
  )
}





export default RepoEntry