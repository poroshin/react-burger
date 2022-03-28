import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { urlIngredients } from '../../utils/constants';

import style from './app.module.css';

const App = () => {
  const [state, setState] = useState({
    isLoaded: false,
    data: []
  });
  const [modal, setModal] = useState({
    isOpenIngredientDetails: false,
    isOpenOrderDetails: false,
  });
  const [ingredient, setIngredient] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const orderDetailData = {
    id: '034536',
  }
  
  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    fetch(urlIngredients)
      .then(res => {
        if(res.status >= 200 && res.status < 300){
          return res.json();
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error
        }
      })
      .then(data => {
        if(data.success){
          setState({ ...state, data: data.data, isLoaded: true }) 
        } else {
          let error = new Error('Server response form error');
          throw error
        }
      })
      .catch(e => {
        console.log(e);
        setState({ ...state, isLoaded: false });
      })
  }

  const handleOpenModalOrder = () => {
    setOrderDetail(orderDetailData);
    setModal({ ...state, isOpenOrderDetails: true });
  }
  const handleOpenModalIngredient = (ingredient) => {
    setIngredient(ingredient);
    setModal({ ...state, isOpenIngredientDetails: true });
  }
  const handleCloseModal = () => {
    setModal({ ...state, isOpenIngredientDetails: false, isOpenOrderDetails: false });
  }
  
  const { data, isLoaded } = state;
  return (
    <>
      <AppHeader />
      <main className={style.main}>
        {modal.isOpenIngredientDetails && <IngredientDetails ingredient={ingredient} onClose={handleCloseModal} />}
        {modal.isOpenOrderDetails && <OrderDetails orderDetail={orderDetail} onClose={handleCloseModal} />}
        <BurgerIngredients data={data} isLoaded={isLoaded} onOpenModalIngredient={handleOpenModalIngredient} />
        <BurgerConstructor data={data} isLoaded={isLoaded} onOpenModalOrder={handleOpenModalOrder} />
      </main>
    </>
  );
}

export default App;
