import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterCuisineBy, setFilterCuisineBy] = useState('All');

  const foodsToDisplay = foods.filter(food => {
    if (filterCuisineBy === 'All') {
      return true;
    } else {
      return food.cuisine === filterCuisineBy;
    }
  });

  const foodList = foodsToDisplay.map(food => {
    return (
      <li key={food.id} onClick={() => handleLiClick(food.id)}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      </li>
    );
  });

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
  }

  // // removing an element from the array in state
  // function handleLiClick(foodID) {
  //   const filteredFoodArray = foods.filter(food => food.id !== foodID);
  //   setFoods(filteredFoodArray);
  // }

  // updating an element in the array in state
  function handleLiClick(foodID) {
    const updatedFoodArray = foods.map(food => {
      if (food.id === foodID) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        };
      } else {
        return food;
      }
    });
    setFoods(updatedFoodArray);
  }

  function handleFilterCuisineBy(event) {
    setFilterCuisineBy(event.target.value);
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <br />
      <select name="filter" onChange={handleFilterCuisineBy}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );
}

export default SpicyFoodList;
