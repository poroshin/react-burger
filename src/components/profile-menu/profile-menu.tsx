import React, { useCallback, FormEvent } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch } from '../../services/hooks';
import { setLogout } from '../../services/actions/profile';

import style from './profile-menu.module.css';

function ProfileMenu() {
  const history = useHistory();
  const dispatch = useDispatch();
	
  const logout = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
			dispatch(setLogout(history));
    },
    []
  );

  return (
    <>
      <NavLink
        to={{ pathname: `/profile` }}
        exact
        className={`text text_type_main-medium pt-6 ${style.nav}`}
        activeClassName={`text text_type_main-medium pt-6 ${style.activeNav}`}
      >
        <p className={style.navText}>Профиль</p>
      </NavLink>
      <NavLink
        to={{ pathname: `/profile/orders` }}
        className={`text text_type_main-medium ${style.nav}`}
        activeClassName={`text text_type_main-medium ${style.activeNav}`}
      >
        <p className={style.navText}>История заказов</p>
      </NavLink>
      <NavLink
        onClick={logout}
        to={{ pathname: `/login` }}
        className={`text text_type_main-medium ${style.nav}`}
        activeClassName={`text text_type_main-medium ${style.activeNav}`}
      >
        <p className={style.navText}>Выход</p>
      </NavLink>
    </>
  );
}

export default ProfileMenu;
