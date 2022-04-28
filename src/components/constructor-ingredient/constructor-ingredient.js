import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { deleteItemSelectedIngredients, sortIngredients } from '../../services/actions/selectedIngredients';
import { decreaseIngredientCount } from '../../services/actions/ingredients';
import { menuItemPropTypes } from '../../utils/types';

import style from './constructor-ingredient.module.css';

export const ConstructorIngredient = ({ingredient}) => {
	const dispatch = useDispatch();
	const ref = useRef();

	const [, dragRef] = useDrag({
		type: 'sort',
		item: ingredient
	});

	const [, dropRef] = useDrop({
		accept: 'sort',
		drop(draggedIngredient) {
			dispatch(sortIngredients(ingredient, draggedIngredient));
		}
	});

	dragRef(dropRef(ref));

	const handleDeleteIngredient = () => {
		dispatch(deleteItemSelectedIngredients(ingredient));
		dispatch(decreaseIngredientCount(ingredient));
	}

	return (
		<li ref={ref} className={`${style.drug} pl-5 mr-1`}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleDeleteIngredient}
			/>
		</li>
	)
}

ConstructorElement.propTypes = {
  ingredient: menuItemPropTypes
};

export default ConstructorIngredient;