import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useSelector } from '../services/hooks';

export const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
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
