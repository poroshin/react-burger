import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './app-header.module.css';

function AppHeader() {
  const location = useLocation();
  return (
    
    <header className={style.header}>
      <div className={style.header__start}>
        <nav className={`${style.header__nav} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
          <BurgerIcon type='primary' />
          <NavLink
            to={{ pathname: `/` }}
            exact
            className={`${style.nav} ml-2 text text_type_main-default text_color_inactive`}
            activeClassName={`${style.navActive} ml-2 text text_type_main-default`}
          >
            Конструктор
          </NavLink>
        </nav>
        <nav className={`${style.header__nav} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 ml-2`}>
          <ListIcon type='primary' />
          <NavLink
            to={{ pathname: `/feed` }}
            className={`${style.nav} ml-2 text text_type_main-default text_color_inactive`}
            activeClassName={`${style.navActive} ml-2 text text_type_main-default`}
          >
            Лента заказов
          </NavLink>
        </nav>
      </div>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.header__end}>
        <nav className={`${style.header__nav} pt-4 pr-5 pb-4 pl-5 mt-4 mb-4`}>
          <ProfileIcon type="primary" />
          <NavLink
            to={{ pathname: `/profile` }}
            className={`${style.nav} ml-2 text text_type_main-default text_color_inactive`}
            activeClassName={`${style.navActive} ml-2 text text_type_main-default`}
          >
            Личный кабинкет
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
