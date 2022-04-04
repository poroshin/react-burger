import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { urlIngredients, urlOrders } from '../../utils/constants';
import { DataIngredientsContext, OrderDetailContext, SelectedIngredientsContext } from '../../utils/context';

import style from './app.module.css';

const App = () => {
  const [modal, setModal] = useState({
    isOpenIngredientDetails: false,
    isOpenOrderDetails: false,
  });
  const [ingredient, setIngredient] = useState(null);

  const [orderDetail, setOrderDetail] = useState({
    isLoaded: false
  });
  const [dataState, setDataState] = useState({
    isLoaded: false,
    data: []
  });
  const [selectedIngredients, setSelectedIngredients] = useState({
    ingredients: []
  });
  
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
          setDataState({ ...dataState, data: data.data, isLoaded: true }) 
        } else {
          let error = new Error('Server response form error');
          throw error
        }
      })
      .catch(e => {
        console.log(e);
        setDataState({ ...dataState, isLoaded: false });
      })
  }

  const getOrder = () => {
    fetch(urlOrders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(selectedIngredients)
    })
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
          setOrderDetail({ ...orderDetail, name: data.name, orderNumber: data.order.number, isLoaded: true }) 
        } else {
          let error = new Error('Server response form error');
          throw error
        }
      })
      .catch(e => {
        console.log(e);
        setOrderDetail({ ...orderDetail, isLoaded: false });
      })
  }

  const handleOpenModalOrder = () => {
    getOrder();
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
    <>
      <AppHeader />
      <main className={style.main}>
        <DataIngredientsContext.Provider value={{dataState, setDataState}}>
          <SelectedIngredientsContext.Provider value={{selectedIngredients, setSelectedIngredients}}>
            <OrderDetailContext.Provider value={{orderDetail, setOrderDetail}}>
              {modal.isOpenIngredientDetails && <IngredientDetails ingredient={ingredient} onClose={handleCloseModal} />}
              {modal.isOpenOrderDetails && <OrderDetails onClose={handleCloseModal} />}
              <BurgerIngredients onOpenModalIngredient={handleOpenModalIngredient} />
              <BurgerConstructor onOpenModalOrder={handleOpenModalOrder} />
            </OrderDetailContext.Provider>
          </SelectedIngredientsContext.Provider>
        </DataIngredientsContext.Provider>
      </main>
    </>
  );
}

export default App;
