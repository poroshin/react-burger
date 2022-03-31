import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { menuItemPropTypes } from '../../utils/types';
import { filterBun, filterNotBun } from '../../utils/filter';

import style from './burger-constructor.module.css';

const BurgerConstructor = ({data, isLoaded, onOpenModalOrder}) => {
  return (
    <section className={`${style.section} pt-25 pl-5 pb-30`}>
      {isLoaded &&
      <div className={`${style.elements} pb-4`}>
        <div className={`${style.constructor__element} pl-10 pr-3`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={filterBun(data)[0].name + ' (верх)'}
            price={filterBun(data)[0].price}
            thumbnail={filterBun(data)[0].image}
          />
        </div>
        <ul className={style.ingredients}>
          {filterNotBun(data).map((item, index) => (
            <li key={index} className={`${style.drug} pl-5 mr-1`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
            </li>
          ))}
        </ul>
        <div className={`${style.constructor__element} pl-10 pr-3`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={filterBun(data)[0].name + ' (низ)'}
            price={filterBun(data)[0].price}
            thumbnail={filterBun(data)[0].image}
          />
        </div>
      </div>
      }
      <div className={style.checkout}>
        <div className={`${style.price} pr-10`}>
          <p className="text text_type_digits-medium pr-2">6150</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={onOpenModalOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(menuItemPropTypes.isRequired),
};
ConstructorElement.propTypes = {
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
};

export default BurgerConstructor;
