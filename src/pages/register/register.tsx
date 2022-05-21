import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { TRootState } from '../../services/reducers';
import { TLocation } from '../../services/types';
import { registerRequest } from '../../services/api';
import { authRequest, authFailed, registerSuccess } from '../../services/actions/profile';
import { setCookie } from '../../utils/cookie';

import style from './register.module.css';

const RegisterPage = () => {
  const location: TLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile: any = useSelector<TRootState>(state => state.profile);
  const token = localStorage.getItem('refreshToken');

	const [form, setValue] = useState({ name: '', email: '', password: '' });
	
  const onChange = (e: { target: { name: any; value: any; }; }) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  let register = useCallback(
    e => {
      e.preventDefault();

			dispatch(authRequest);
			registerRequest(form).then(data => {
				dispatch(registerSuccess(data));
				let accessToken = data.accessToken.split('Bearer ')[1];
				setCookie('accessToken', accessToken);
				localStorage.setItem('refreshToken', data.refreshToken);
				history.replace({ pathname: '/profile' });
			})
			.catch(e => {
				console.log(e);
				dispatch(authFailed);
			})
    },
    [form]
  );

	if(profile.isLoggedIn && token){
    return <Redirect to={location.state?.from || '/profile'} />;
	}

  return (
		<main className={style.main}>
			<h1 className='text text_type_main-medium'>Регистрация</h1>
			<div className='pt-6'>
				<Input
					name='name'
					value={form.name}
					placeholder={'Имя'}
					onChange={onChange}
					errorText={'Ошибка'}
					size={'default'}
				/>
			</div>
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
				<Button type="primary" size="large" onClick={register}>
					Зарегистрироваться
				</Button>
			</div>
			<p className='text text_type_main-default text_color_inactive pt-20'>Уже зарегистрированы? <Link to='/login' className={style.link}>Войти</Link></p>
		</main>
  );
}

export default RegisterPage;