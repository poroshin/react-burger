import React, { useEffect } from 'react';

import { wsUrlAll } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { useSelector, useDispatch } from '../../services/hooks';
import { TOrderFeed, TOrder } from '../../services/types';
import OrderInfo from '../../components/order-info/order-info';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { TWsState } from '../../services/reducers/wsReducer';

import style from './order-feed.module.css';

const OrderFeedPage = () => {
  const dispatch = useDispatch();
  const { feed }: TWsState = useSelector((state) => state.wsReducer);
  const orders = feed.orders;

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrlAll, getCookie('accessToken')));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);
  
  return (
		<main className={style.main}>
      <section className={`${style.section} pt-5 pr-5`}>
        <h1 className='text text_type_main-large pt-5 pb-5'>
          Лента заказов
        </h1>
        {orders.length !== 0 &&
          <div className={`${style.scrollBar} pr-1`}>
            {orders.map((item: TOrder, index: number) => (
              <OrderInfo key={index} order={item} />
            ))}
          </div>
        }
      </section>
      <section className={`${style.section} pt-25 pl-5 pb-30`}>
        <div className={style.columns}>
          <div className={style.orders}>
            <h2 className='text text_type_main-medium pt-5 pb-5'>
              Готовы:
            </h2>
            <ul className={style.items}>
              <li className={`${style.orderNumber} ${style.ready} text text_type_digits-default pr-1`}>034525</li>
              <li className={`${style.orderNumber} ${style.ready} text text_type_digits-default pr-1`}>034525</li>
              <li className={`${style.orderNumber} ${style.ready} text text_type_digits-default pr-1`}>034525</li>
              <li className={`${style.orderNumber} ${style.ready} text text_type_digits-default pr-1`}>034525</li>
            </ul>
          </div>
          <div className={style.orders}>
            <h2 className='text text_type_main-medium pt-5 pb-5'>
              В работе:
            </h2>
            <ul className={style.items}>
              <li className={`${style.orderNumber} text text_type_digits-default pr-1`}>034525</li>
              <li className={`${style.orderNumber} text text_type_digits-default pr-1`}>034525</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className='text text_type_main-medium pt-10'>
            Выполнено за все время:
          </h2>
          <p className="text text_type_digits-large">28752</p>
        </div>
        <div>
          <h2 className='text text_type_main-medium pt-10'>
            Выполнено за сегодня:
          </h2>
          <p className="text text_type_digits-large">138</p>
        </div>
      </section>
		</main>
  );
}

export default OrderFeedPage;