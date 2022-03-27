import React from 'react';
import PropTypes from 'prop-types';
import style from './ingredient-details.module.css';
import Modal from '../../components/modal/modal';
import { menuItemPropTypes } from '../../utils/constants';

const IngredientDetails = ({onClose, ingredient}) => {
  return (
		<Modal onClose={onClose}>
			<div className={style.modal}>
				<h2 className='text text_type_main-large pt-10 pl-10 mt-2'>Детали ингредиента</h2>
				<div className={style.description}>
					<img src={ingredient.image_large} alt={ingredient.name} className={style.img + ' pl-4 pr-4'}></img>
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
		</Modal>
  );
}
IngredientDetails.propTypes = {
  ingredient: menuItemPropTypes.isRequired,
  onClose: PropTypes.func.isRequired
}

export default IngredientDetails;
