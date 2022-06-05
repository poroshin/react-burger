import React, { useState, useCallback, useEffect, FormEvent } from 'react';

import { wsUrlUser } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import { TOrderFeed, TOrder } from '../../services/types';
import ProfileMenu from '../../components/profile-menu/profile-menu';
import OrderInfo from '../../components/order-info/order-info';
import { useSelector, useDispatch } from '../../services/hooks';
import { TUserForm } from '../../services/types';
import { setUserRequest, tokenRequest } from '../../services/api';
import { authRequest, authFailed, setUserSuccess, tokenSuccess } from '../../services/actions/profile';
import { wsConnectionStart, wsConnectionClosed } from '../../services/actions/wsActions';
import { setCookie } from '../../utils/cookie';
import { TWsState } from '../../services/reducers/wsReducer';

import style from './profile-order-feed.module.css';

const ProfileOrderFeedPage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);
  const { userFeed }: TWsState = useSelector((state) => state.wsReducer);
  const orders = userFeed.orders;

  useEffect(() => {
    dispatch(wsConnectionStart(wsUrlUser, getCookie('accessToken')));
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);
	
  const setUser = (form: TUserForm) => {
    dispatch(authRequest);
    setUserRequest(form).then(data => {
      dispatch(setUserSuccess(data));
    })
    .catch((e: number | string | null) => {
      if (e == 403) {
        dispatch(authRequest);
        tokenRequest().then(data => {
          dispatch(tokenSuccess());
          let accessToken = data.accessToken.split('Bearer ')[1];
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          setUser(form);
        })
        .catch((e: number | string | null) => {
          console.log(e);
          dispatch(authFailed);
        })
      }
      console.log(e);
      dispatch(authFailed);
    })
  };

  return (
		<main className={style.main}>
      <div className={style.main__start}>
        <ProfileMenu />
			  <p className='text text_type_main-default text_color_inactive pt-20'>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      {orders.length !== 0 &&
        <div className={`${style.orders} pt-10`}>
          <div className={`${style.scrollBar}`}>
            {orders.map((item: TOrder) => (
              <OrderInfo key={item._id} order={item} />
            ))}
          </div>
        </div>
      }
		</main>
  );
}

export default ProfileOrderFeedPage;