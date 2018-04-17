import React from 'react';
import Meal from './meal.js'

const Results = ({recipies, addMeal}) => (
  <div>
    {recipies.map((recipie , i )=>{
      return(
        <div>
          <Meal
            key={i}
            title={recipie.title}
            ingredients={recipie.ingredients}
            thumbnail={recipie.thumbnail}
            href={recipie.href}
          />
          <button onClick={()=>{
            return addMeal(recipie)
          }} >Add Meal</button>
        </div>
      )
    })}
  </div>
);

export default Results;
