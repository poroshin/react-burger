import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { TRootState } from '../../services/reducers';
import { TLocation } from '../../services/types';
import { loginRequest } from '../../services/api';
import { authRequest, authFailed, loginSuccess } from '../../services/actions/profile';
import { setCookie } from '../../utils/cookie';

import style from './login.module.css';

const LoginPage = () => {
  const location: TLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile: any = useSelector<TRootState>(state => state.profile);
  const token = localStorage.getItem('refreshToken');

	const [form, setValue] = useState({ email: '', password: '' });
	
  const onChange = (e: { target: { name: any; value: any; }; }) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  let login = useCallback(
    e => {
      e.preventDefault();
			
			dispatch(authRequest);
			loginRequest(form).then(data => {
				dispatch(loginSuccess(data));
				let accessToken = data.accessToken.split('Bearer ')[1];
				setCookie('accessToken', accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				history.replace({ pathname: '/' });
			})
			.catch(e => {
				console.log(e);
				dispatch(authFailed);
			})
    },
    [form]
  );

	if(profile.isLoggedIn && token){
    return <Redirect to={location.state?.from || '/'} />;
	}

  return (
		<main className={style.main}>
			<h1 className='text text_type_main-medium'>Вход</h1>
			<div className='pt-6'>
				<Input
					name='email'
					placeholder={'E-mail'}
					onChange={onChange}
					value={form.email}
					errorText={'Ошибка'}
					size={'default'}
				/>
			</div>
			<div className='pt-6'>
				<PasswordInput 
					name='password'
					value={form.password}
					onChange={onChange}
				/>
			</div>
			<div className='pt-6'>
				<Button type="primary" size="large" onClick={login}>
					Вход
				</Button>
			</div>
			<p className='text text_type_main-default text_color_inactive pt-20'>Вы — новый пользователь? <Link to='/register' className={style.link}>Зарегистрироваться</Link></p>
			<p className='text text_type_main-default text_color_inactive pt-1'>Забыли пароль? <Link to='/forgot-password' className={style.link}>Восстановить пароль</Link></p>
		</main>
  );
}

export default LoginPage;