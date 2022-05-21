import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderDetails from '../../components/order-details/order-details';
import { getOrderRequest } from '../../services/api';
import { getOrderRequested, getOrderFailed, getOrderSuccess } from '../../services/actions/order';

import style from './home.module.css';

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);
  const selectedBun = useSelector(state => state.selectedIngredients.bun);
  const selectedIngredients = useSelector(state => state.selectedIngredients.data);

  const [modal, setModal] = useState({
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
    if(profile.isLoggedIn){
			dispatch(getOrderRequested);
			getOrderRequest(ingredientsToOrder).then(data => {
				dispatch(getOrderSuccess(data));
        setModal({ ...modal, isOpenOrderDetails: true });
			})
			.catch(e => {
				console.log(e);
				dispatch(getOrderFailed);
			})
    }else{
      history.replace({ pathname: '/profile' });
    }
  }
  const handleCloseModal = () => {
    setModal({ ...modal, isOpenOrderDetails: false });
  }
  
  return (
		<main className={style.main}>
			{modal.isOpenOrderDetails && <OrderDetails onClose={handleCloseModal} />}
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor onOpenModalOrder={handleOpenModalOrder} />
			</DndProvider>
		</main>
  );
}

export default HomePage;