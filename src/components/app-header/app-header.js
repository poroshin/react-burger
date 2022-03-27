import React from 'react';
import style from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    
    <header className={style.flexCenter}>
      <div className={style.flexRowStart}>
        <nav className={style.navBtn + " pt-4 pr-5 pb-4 pl-5 mt-4 mb-4"}>
          <BurgerIcon type="primary" />
          <span className="ml-2 text text_type_main-default">Конструктор</span>
        </nav>
        <nav className={style.navBtn + " pt-4 pr-5 pb-4 pl-5 mt-4 mb-4 ml-2"}>
          <ListIcon type="primary" />
          <span className="ml-2 text text_type_main-default text_color_inactive">Лента заказов</span>
        </nav>
        </div>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.flexRowEnd}>
        <nav className={style.navBtn + " pt-4 pr-5 pb-4 pl-5 mt-4 mb-4"}>
          <ProfileIcon type="primary" />
          <span className="ml-2 text text_type_main-default text_color_inactive">Личный кабинкет</span>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
