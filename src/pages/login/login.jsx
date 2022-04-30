import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { loginRequest } from '../../services/api';
import { authRequest, authFailed, loginSuccess } from '../../services/actions/profile';
import { setCookie } from '../../utils/cookie';

import style from './login.module.css';

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

	const [form, setValue] = useState({ email: '', password: '' });
	
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  let login = useCallback(
    e => {
      e.preventDefault();
			
			dispatch(authRequest);
			loginRequest(form).then(data => {
				dispatch(loginSuccess(data));
				let authToken = data.accessToken.split('Bearer ')[1];
				setCookie('token', authToken);
        localStorage.setItem('refreshToken', data.refreshToken);
				history.replace({ pathname: '/profile' });
			})
			.catch(e => {
				console.log(e);
				dispatch(authFailed);
			})
      // auth.signIn(form);
    },
    [form]
  );

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
					placeholder={'Пароль'}
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