import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { TRootState } from '../../services/reducers';
import { TIngredient } from '../../services/types';

import style from './ingredient-details.module.css';

const IngredientDetails = () => {
  const dataState: any = useSelector<TRootState>(state => state.ingredients);
  const { id }: { id: string } = useParams();

  const ingredients = dataState.data;
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  return (
		<>
			{ingredient ? (
			<div className={style.modal}>
				<h2 className='text text_type_main-large pt-10 pl-10 mt-2'>Детали ингредиента</h2>
				<div className={style.description}>
					<img src={ingredient.image_large} alt={ingredient.name} className={`${style.img} pl-4 pr-4`}></img>
					<p className='text text_type_main-medium pt-4 pb-8'>{ingredient.name}</p>
					<ul className={style.composition}>
						<li className={style.items}>
							<p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
							<p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
						</li>
						<li className={style.items}>
							<p className='text text_type_main-default text_color_inactive'>Белки, г</p>
							<p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
						</li>
						<li className={style.items}>
							<p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
							<p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
						</li>
						<li className={style.items}>
							<p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
							<p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
						</li>
					</ul>
				</div>
			</div>
			) : null}
		</>
  );
}

export default IngredientDetails;
