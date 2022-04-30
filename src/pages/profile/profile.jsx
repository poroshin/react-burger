import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

import { logoutRequest, getUserRequest, setUserRequest } from '../../services/api';
import { authRequest, authFailed, logoutSuccess, getUserSuccess, setUserSuccess } from '../../services/actions/profile';
import { deleteCookie } from '../../utils/cookie';

import style from './profile.module.css';

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

	const [form, setValue] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    setValue({ name: profile.user.name, email: profile.user.email });
  }, []);
	
  const setUser = (form) => {
    dispatch(authRequest);
    setUserRequest(form).then(data => {
      dispatch(setUserSuccess(data));
    })
    .catch(e => {
      console.log(e);
      dispatch(authFailed);
    })
  };
	
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  let logout = useCallback(
    e => {
      e.preventDefault();
			
			dispatch(authRequest);
			logoutRequest().then(data => {
				dispatch(logoutSuccess(data));
        deleteCookie('token');
				localStorage.removeItem('refreshToken');
				history.replace({ pathname: '/login' });
			})
			.catch(e => {
				console.log(e);
				dispatch(authFailed);
			})
      // auth.signIn(form);
    },
    [form]
  );
  
  const [focusOnName, setFocusOnName] = useState(false);
  const [focusOnEmail, setFocusOnEmail] = useState(false);

  const onClickEditName = () => {
    setFocusOnName(true);
  }

  const onClickEditEmail = () => {
    setFocusOnEmail(true);
  }

  const onClickEditPass = () => {
  }
  
  const onBlur = () => {
    setFocusOnName(false);
    setFocusOnEmail(false);
  }

  return (
		<main className={style.main}>
      <div className={style.main__start}>
        <NavLink
          to={{ pathname: `/profile` }}
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
			  <p className='text text_type_main-default text_color_inactive pt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={style.column}>
        <div className='pt-6'>
          <Input
            name='name'
            value={form.name}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'EditIcon'}
            onIconClick={onClickEditName}
            onBlur={onBlur}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!focusOnName}
          />
        </div>
        <div className='pt-6'>
          <Input
            name='email'
            value={form.email}
            placeholder={'E-mail'}
            onChange={onChange}
            icon={'EditIcon'}
            onIconClick={onClickEditEmail}
            onBlur={onBlur}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!focusOnEmail}
          />
        </div>
        <div className='pt-6'>
          <PasswordInput 
            name='password'
            value={form.password}
            placeholder={'Пароль'}
            onIconClick={onClickEditPass}
            onChange={onChange}
          />
        </div>
      </div>
      <div className={style.main__end}></div>
		</main>
  );
}

export default ProfilePage;