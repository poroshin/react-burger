import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';

import { useSelector, useDispatch } from '../services/hooks';
import { TLocation } from '../services/types';

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const location: TLocation = useLocation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileReducer);

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
