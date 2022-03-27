import React, { useState, useEffect } from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
// import { data } from '../../utils/data';
import { urlIngredients } from '../../utils/constants';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const App = () => {
  const [state, setState] = useState({
    isOpenIngredientDetails: false,
    isOpenOrderDetails: false,
    isLoading: false,
    hasError: false,
    isLoaded: false,
    data: []
  });
  const [ingredient, setIngredient] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const orderDetailData = {
    id: '034536',
  }
  
  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(urlIngredients)
      .then(res => res.json())
      .then(data => setState({ ...state, data: data.data, isLoading: false, isLoaded: true }))
      .catch(e => {
        console.log(e);
        setState({ ...state, hasError: true, isLoading: false });
      })
  }
  const { data, isLoading, hasError, isLoaded } = state;

  const handleOpenModalOrder = () => {
    setOrderDetail(orderDetailData);
    setState({ ...state, isOpenOrderDetails: true });
  }
  const handleOpenModalIngredient = (ingredient) => {
    setIngredient(ingredient);
    setState({ ...state, isOpenIngredientDetails: true });
  }
  const handleCloseModal = () => {
    setState({ ...state, isOpenIngredientDetails: false, isOpenOrderDetails: false });
  }
  
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        {state.isOpenIngredientDetails && <IngredientDetails ingredient={ingredient} onClose={handleCloseModal} />}
        {state.isOpenOrderDetails && <OrderDetails orderDetail={orderDetail} onClose={handleCloseModal} />}
        <BurgerIngredients data={data} isLoaded={isLoaded} onOpenModalIngredient={handleOpenModalIngredient} />
        <BurgerConstructor data={data} isLoaded={isLoaded} onOpenModalOrder={handleOpenModalOrder} />
      </main>
    </>
  );
}

export default App;
