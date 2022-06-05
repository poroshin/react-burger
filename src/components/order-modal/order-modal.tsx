import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { wsUrlAll } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { sayDate } from '../../utils/filter';
import { useSelector, useDispatch } from '../../services/hooks';
import { TIngredient, TOrder } from '../../services/types';
import { TWsState } from '../../services/reducers/wsReducer';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';

import style from './order-modal.module.css';

const OrderModal = () => {
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const { feed }: TWsState = useSelector((state) => state.wsReducer);
  const orders = feed.orders;

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrlAll, getCookie('accessToken')));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);
  
  const dataState = useSelector(state => state.ingredientsReducer);
  const ingredientsOrder: TIngredient[] = [];
  let totalPrice: number = 0;
  
  const order = orders.find((item: TOrder) => item._id === id);

  if(order?.ingredients){
    for (let i = 0; i < order?.ingredients.length; i++) {
      const ingredient = dataState.data.find((item: TIngredient) => item._id === order?.ingredients[i]);
      if(ingredient) ingredientsOrder.push(ingredient);
      totalPrice = ingredient ? totalPrice + ingredient?.price : totalPrice;
    }
  }

  // const dataState = useSelector(state => state.ingredientsReducer);

  // const ingredients = dataState.data;
  // const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  return (
		<>
			{order && ingredientsOrder && (
			<div className={`${style.modal} pr-6`}>
				<p className={`${style.description} text text_type_digits-small pt-10 pb-2 pl-10 mt-2`}>
					#{order.number}
				</p>
        <p className={`pl-6 pr-6 pt-6 text text text_type_main-medium`}>
          Название бургера
        </p>
        <p className={`pl-6 pr-6 pt-2 text text text_type_main-small`}>
          Статус
        </p>
        <p className={`pl-6 pr-6 pt-8 text text text_type_main-medium`}>
          Состав:
        </p>
				<div className={`${style.scrollBar} pt-2 pl-6 pr-4`}>
          {ingredientsOrder.map((item: TIngredient) => (
            <div className={`${style.spaceBetween} pl-6`}>
              <div className={`${style.price}`}>
                  <>
                    <div className={`${style.imgBorder}`}>
                      <img src={item.image_mobile} alt={item.name} className={`${style.img}`} />
                    </div>
                    <p className={`pl-6 pr-6 pt-6 text text text_type_main-small`}>
                      {item.name}
                    </p>
                  </>
              </div>
              <div className={`${style.price} pt-6 pb-1`}>
                <p className='text text_type_main-default pr-2'>{item.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
					
				</div>
        <div className={`${style.spaceBetween} pl-6 pr-6 pt-6`}>
          <p className={`text text_type_main-default text_color_inactive`}>
            {sayDate(order.createdAt)}
          </p>
          <div className={`${style.price} pt-1 pb-1`}>
            <p className='text text_type_main-default pr-2'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
			</div>
			)}
		</>
  );
}

export default OrderModal;
