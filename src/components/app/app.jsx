import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { getUser } from '../../services/auth';
import { getIngredients } from '../../services/actions/ingredients';
import { getUserRequest } from '../../services/api';
import { authRequest, authFailed, getUserSuccess } from '../../services/actions/profile';
import { ProtectedRoute } from '../protected-route';
import AppHeader from '../app-header/app-header';
import Loading from '../loading/loading';
import HomePage from '../../pages/home/home';
import NotFound404 from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import IngredientPage from '../../pages/ingredients/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const dataState = useSelector(state => state.ingredients);
  
  useEffect(() => {
    dispatch(getIngredients());

    dispatch(authRequest);
    getUserRequest().then(data => {
      dispatch(getUserSuccess(data));
    })
    .catch(e => {
      console.log(e);
      dispatch(authFailed);
    })
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <ProfilePage />
          </ProtectedRoute>
          {dataState.isLoaded && (
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
          </Route>
          )}
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
