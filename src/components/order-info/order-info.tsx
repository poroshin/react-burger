import React, { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { getOrderStatus, getOrderStatusStyle, sayDate } from '../../utils/filter';
import { useSelector } from '../../services/hooks';
import { TOrder, TIngredient } from '../../services/types';

import style from './order-info.module.css';

type TOrderItem = {
  order: TOrder;
}

const OrderInfo: FC<TOrderItem> = ({order}) => {
  const location = useLocation();
  const { pathname } = useLocation();
  const linkTo = pathname === "/profile/orders" ? `/profile/orders/${order._id}` : `/feed/${order._id}`;

  const dataState = useSelector(state => state.ingredientsReducer);
  const ingredientsOrder: TIngredient[] = [];
  let totalPrice: number = 0;
  
  for (let i = 0; i < order?.ingredients.length; i++) {
    const ingredient = dataState.data.find((item: TIngredient) => item._id === order?.ingredients[i]);
    if(ingredient) ingredientsOrder.push(ingredient);
    totalPrice = ingredient ? totalPrice + ingredient?.price : totalPrice;
  }

  return (
    <Link
      className={style.link}
      to={{
        pathname: linkTo,
        state: { background: location },
      }}
    >
      {dataState.isLoaded && ingredientsOrder && 
        <div className={`${style.orderDetails} pb-4`}>
          <div className={`${style.spaceBetween} pl-6 pr-6 pt-6`}>
            <p className={`${style.orderNumber} text text_type_digits-default`}>
              #{order.number}
            </p>
            <p className={`text text_type_main-default text_color_inactive`}>
              {sayDate(order.createdAt)}
            </p>
          </div>
          <p className={`pl-6 pr-6 pt-2 text text text_type_main-medium`}>
            {order.name}
          </p>
          <p className={`pl-6 pr-6 text text text_type_main-small`} style={getOrderStatusStyle(order.status)}>
            {getOrderStatus(order.status)}
          </p>
          <div className={`${style.spaceBetween} pl-6 pr-6 pt-2`}>
            <div className={`${style.price} pl-10 pt-1 pb-1`}>
              {ingredientsOrder.map((item: TIngredient) => (
                <div className={`${style.imgBorder}`}>
                  <img src={item.image_mobile} alt={item.name} className={`${style.img}`} />
                </div>
              ))}
            </div>
            <div className={`${style.price} pt-1 pb-1`}>
              <p className='text text_type_main-default pr-2'>{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      }
    </Link>
  );
}

export default OrderInfo;
