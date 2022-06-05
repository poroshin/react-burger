import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/hooks';
import { TLocation } from '../../services/types';
import { getCookie, setCookie } from '../../utils/cookie';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserRequest, tokenRequest } from '../../services/api';
import { authRequest, authFailed, getUserSuccess, tokenSuccess } from '../../services/actions/profile';
import { ProtectedRoute } from '../protected-route';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderModal from '../order-modal/order-modal';

import HomePage from '../../pages/home/home';
import NotFound404 from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredients/ingredients';
import OrderFeedPage from '../../pages/order-feed/order-feed';
import OrderPage from '../../pages/order/order';
import ProfileOrderFeedPage from '../../pages/profile-order-feed/profile-order-feed';

const App = () => {
  const location: TLocation = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const dataState = useSelector(state => state.ingredientsReducer);
  
  useEffect(() => {
    dispatch(getIngredients());
    const refreshToken = localStorage.getItem('refreshToken');

    dispatch(authRequest);
    getUserRequest().then(data => {
      dispatch(getUserSuccess(data));
    })
    .catch((e: number | string | null) => {
      if (e == 403) {
        dispatch(authRequest);
        tokenRequest().then(data => {
          dispatch(tokenSuccess());
          let accessToken = data.accessToken.split('Bearer ')[1];
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

          dispatch(authRequest);
          getUserRequest().then(data => {
            dispatch(getUserSuccess(data));
          })
        })
        .catch((e: number | string | null) => {
          console.log(e);
          dispatch(authFailed);
        })
      }
      console.log(e);
      dispatch(authFailed);
    })
  }, [dispatch]);

  const handleCloseModal = () => {
    history.goBack();
  };
  
  let background = location.state && location.state.background;

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        {dataState.isLoaded && (
          <Route path="/ingredients/:id" exact>
            <IngredientPage />
          </Route>
        )}
        <Route path="/feed" exact>
          <OrderFeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderPage />
        </Route>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileOrderFeedPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrderPage />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleCloseModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={handleCloseModal}>
            <OrderModal />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal onClose={handleCloseModal}>
            <OrderModal />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;
