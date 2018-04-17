import React from 'react';

const Meal = ({title, ingredients, thumbnail, href, i}) => (
  <div key={i}>
    <h2>{title}</h2>
    <div>
      <p>Shopping list: {ingredients}</p>
    </div>
    <div>
      <img src={thumbnail} alt="not found" />
    </div>
    <a href={href}>Click here for Directions</a>
  </div>
);

export default Meal;
