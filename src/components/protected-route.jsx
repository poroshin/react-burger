import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { authRequest, authFailed, getUserSuccess } from '../services/actions/profile';

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile);

  return (
    <Route
      {...rest}
      render={({ location }) => 
				profile.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
