import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { logoutRequest, setUserRequest, tokenRequest } from '../../services/api';
import { authRequest, authFailed, logoutSuccess, getUserSuccess, setUserSuccess, updateToken, tokenSuccess } from '../../services/actions/profile';
import { setCookie, deleteCookie } from '../../utils/cookie';

import style from './profile.module.css';

const ProfilePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const [isEdited, setIsEdited] = useState(false);
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
      if (e == 403) {
        dispatch(authRequest);
        tokenRequest().then(data => {
          dispatch(tokenSuccess(data));
          let accessToken = data.accessToken.split('Bearer ')[1];
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          setUser(form);
        })
        .catch(e => {
          console.log(e);
          dispatch(authFailed);
        })
      }
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
        deleteCookie('accessToken');
				localStorage.removeItem('refreshToken');
				history.replace({ pathname: '/login' });
			})
			.catch(e => {
				console.log(e);
				dispatch(authFailed);
			})
    },
    [form]
  );

  const onClickEdit = () => {
    setIsEdited(true);
  }

  const onSave = () => {
    setUser({ name: form.name, email: form.email });
    setIsEdited(false);
  }

  const onCancel = () => {
    setIsEdited(false);
    setValue({ name: profile.user.name, email: profile.user.email });
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
            onIconClick={onClickEdit}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!isEdited}
          />
        </div>
        <div className='pt-6'>
          <Input
            name='email'
            value={form.email}
            placeholder={'E-mail'}
            onChange={onChange}
            icon={'EditIcon'}
            onIconClick={onClickEdit}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!isEdited}
          />
        </div>
        <div className='pt-6'>
          <Input
            name='password'
            value={form.password}
            placeholder={'Пароль'}
            onChange={onChange}
            icon={'EditIcon'}
            onIconClick={onClickEdit}
            errorText={'Ошибка'}
            size={'default'}
            disabled={!isEdited}
          />
        </div>
        {isEdited && (
        <div className='pt-6'>
          <Button type="primary" size="medium" onClick={onSave}>
            Сохранить
          </Button>
          <Button type="secondary" size="medium" onClick={onCancel}>
            Отмена
          </Button>
        </div>
        )}
      </div>
      <div className={style.main__end}></div>
		</main>
  );
}

export default ProfilePage;