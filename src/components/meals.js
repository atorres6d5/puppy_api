import React from 'react';
import Meal from './meal.js'

const Meals = ({myMeals, removeMeal}) => (
  <div>
    {
      myMeals.map((meal, i)=>{
        return(
          <div>
            <h1>My Meals</h1>
            <Meal
              key={i}
              title={meal.title}
              ingredients={meal.ingredients}
              thumbnail={meal.thumbnail}
              href={meal.href} />
              <button onClick={()=>{
                return removeMeal(meal)
              }}>Remove Meal</button>
          </div>
        )
      })
    }
  </div>
);

export default Meals;
