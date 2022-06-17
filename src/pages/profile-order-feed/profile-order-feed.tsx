import React, { useEffect } from 'react';

import { wsUrlUser } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { TOrder } from '../../services/types';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import OrderInfo from '../../components/order-info/order-info';
import { useSelector, useDispatch } from '../../services/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { TWsState } from '../../services/reducers/wsReducer';

import style from './profile-order-feed.module.css';

const ProfileOrderFeedPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);
  const { userFeed }: TWsState = useSelector((state) => state.wsReducer);
  const orders = userFeed.orders;

  useEffect(() => {
    if(profile.isLoggedIn){
      dispatch(wsConnectionStart(wsUrlUser, getCookie('accessToken')));
      return () => {
        dispatch(wsConnectionClosed());
      };
    }
  }, [dispatch]);

  return (
		<main className={style.main}>
      <div className={style.main__start}>
        <ProfileMenu />
			  <p className='text text_type_main-default text_color_inactive pt-20'>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      {profile.isLoggedIn && orders && orders.length !== 0 &&
        <div className={`${style.orders} pt-10`}>
          <div className={`${style.scrollBar}`}>
            {orders.map((item: TOrder, index: number) => (
              <OrderInfo key={index} order={item} />
            ))}
          </div>
        </div>
      }
		</main>
  );
}

export default ProfileOrderFeedPage;