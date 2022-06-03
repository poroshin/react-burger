import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

import style from './ingredients.module.css';

const IngredientPage = () => {
  return (
		<main className={style.main}>
      <IngredientDetails />
		</main>
  );
}

export default IngredientPage;