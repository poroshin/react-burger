import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { getUserRequest } from '../services/api';
import { authRequest, authFailed, getUserSuccess } from '../services/actions/profile';

export function ProtectedRoute({ children, ...rest }) {
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
