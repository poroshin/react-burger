import { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';

import { TRootState } from '../services/reducers';
import { TLocation } from '../services/types';
import { authRequest, authFailed, getUserSuccess } from '../services/actions/profile';

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const location: TLocation = useLocation();
  const dispatch = useDispatch();
  const profile: any = useSelector<TRootState>(state => state.profile);

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
