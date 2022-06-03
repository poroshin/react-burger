import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TIngredient } from '../../services/types';
import { deleteItemSelectedIngredients, sortIngredients } from '../../services/actions/selectedIngredients';
import { decreaseIngredientCount } from '../../services/actions/ingredients';

import style from './constructor-ingredient.module.css';

type TIngredientItem = {
	ingredient: TIngredient;
}

export const ConstructorIngredient = ({ingredient}: TIngredientItem) => {
	const dispatch = useDispatch();
	const ref = useRef<HTMLLIElement>(null);

	const [, dragRef] = useDrag({
		type: 'sort',
		item: ingredient
	});

	const [, dropRef] = useDrop({
		accept: 'sort',
		drop(draggedIngredient: TIngredient) {
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

export default ConstructorIngredient;