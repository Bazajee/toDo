import React from 'react'

const HomeNote = ({ note }) => {
    return (
      <div className="container-fluid">
        <h3 className=''>{note.title}</h3>
        <p>{note.creationDate} </p>
    </div>
  );
};

export default HomeNote