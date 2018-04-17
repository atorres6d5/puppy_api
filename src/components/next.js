import React from 'react';

const Next = ({ currentPage, changePage}) => (
  <form onSubmit={( e )=>{
    return changePage(e , currentPage)
  }}>
    <button>Next Page</button>
  </form>
);

export default Next;
