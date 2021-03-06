import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useSelector, useDispatch } from '../../services/hooks';
import { TIngredient } from '../../services/types';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderDetails from '../../components/order-details/order-details';
import { getOrderRequest } from '../../services/api';
import { getOrderRequested, getOrderFailed, getOrderSuccess } from '../../services/actions/order';

import style from './home.module.css';

type TIngredientsToOrder = {
  ingredients: string[];
}

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileReducer);
  const selectedBun = useSelector(state => state.selectedIngredientsReducer.bun);
  const selectedIngredients = useSelector(state => state.selectedIngredientsReducer.data);

  const [modal, setModal] = useState({
    isOpenOrderDetails: false,
    orderPrepare: false
  });
  const [ingredient, setIngredient] = useState(null);

  const handleOpenModalOrder = () => {
    const tempIngredientsArray: Array<string> = [];
    if(selectedBun)tempIngredientsArray.push(selectedBun._id);
    selectedIngredients.map((item: TIngredient, index: number) => {
      tempIngredientsArray.push(item._id);
    });
    const ingredientsToOrder: TIngredientsToOrder = {ingredients: tempIngredientsArray};
    if(profile.isLoggedIn){
      setModal({ ...modal, orderPrepare: true });
			dispatch(getOrderRequested);
			getOrderRequest(ingredientsToOrder).then(data => {
				dispatch(getOrderSuccess(data));
        setModal({ ...modal, isOpenOrderDetails: true });
			})
			.catch((e: number | string | null) => {
				console.log(e);
				dispatch(getOrderFailed);
			})
    }else{
      history.replace({ pathname: '/profile' });
    }
  }
  const handleCloseModal = () => {
    setModal({ ...modal, isOpenOrderDetails: false, orderPrepare: false });
  }
  
  return (
		<main className={style.main}>
			{modal.isOpenOrderDetails && <OrderDetails onClose={handleCloseModal} />}
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor onOpenModalOrder={handleOpenModalOrder} orderPrepare={modal.orderPrepare} />
			</DndProvider>
		</main>
  );
}

export default HomePage;