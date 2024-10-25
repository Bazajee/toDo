import React from 'react'

const HomeNote = ({ note }) => {
    return (
      <div className="">
        <h3 className='d-flex justify-content-start'>{note.title}</h3>
        <p>{note.creationDate} </p>
    </div>
  );
};

export default HomeNote