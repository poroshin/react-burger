import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import { getOrder } from '../../services/actions/order';

import style from './home.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const selectedBun = useSelector(state => state.selectedIngredients.bun);
  const selectedIngredients = useSelector(state => state.selectedIngredients.data);

  const [modal, setModal] = useState({
    isOpenIngredientDetails: false,
    isOpenOrderDetails: false,
  });
  const [ingredient, setIngredient] = useState(null);

  const handleOpenModalOrder = () => {
    const tempIngredientsArray = [];
    if(selectedBun)tempIngredientsArray.push(selectedBun._id);
    selectedIngredients.map((item, index) => {
      tempIngredientsArray.push(item._id);
    });
    const ingredientsToOrder = {ingredients: tempIngredientsArray};
    dispatch(getOrder(ingredientsToOrder));
    setModal({ ...modal, isOpenOrderDetails: true });
  }
  const handleOpenModalIngredient = (ingredient) => {
    setIngredient(ingredient);
    setModal({ ...modal, isOpenIngredientDetails: true });
  }
  const handleCloseModal = () => {
    setModal({ ...modal, isOpenIngredientDetails: false, isOpenOrderDetails: false });
  }
  
  return (
		<main className={style.main}>
			{modal.isOpenIngredientDetails && <IngredientDetails ingredient={ingredient} onClose={handleCloseModal} />}
			{modal.isOpenOrderDetails && <OrderDetails onClose={handleCloseModal} />}
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients onOpenModalIngredient={handleOpenModalIngredient} />
				<BurgerConstructor onOpenModalOrder={handleOpenModalOrder} />
			</DndProvider>
		</main>
  );
}

export default HomePage;