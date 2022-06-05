import React, { useState, useCallback, FormEvent } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../services/hooks';
import { TLocation } from '../../services/types';
import { loginThunk } from '../../services/actions/profile';

import style from './login.module.css';

const LoginPage = () => {
  const location: TLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileReducer);
  const token = localStorage.getItem('refreshToken');

	const [form, setValue] = useState({ email: '', password: '' });
	
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  const login = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
			dispatch(loginThunk(form, history));
    },
    [form]
  );

	if(profile.isLoggedIn && token){
    return <Redirect to={location.state?.from || '/'} />;
	}

  return (
		<main className={style.main}>
			<h1 className='text text_type_main-medium'>Вход</h1>
			<form onSubmit={login} className={style.form}>
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
					<Button type="primary" size="large">
						Вход
					</Button>
				</div>
			</form>
			<p className='text text_type_main-default text_color_inactive pt-20'>Вы — новый пользователь? <Link to='/register' className={style.link}>Зарегистрироваться</Link></p>
			<p className='text text_type_main-default text_color_inactive pt-1'>Забыли пароль? <Link to='/forgot-password' className={style.link}>Восстановить пароль</Link></p>
		</main>
  );
}

export default LoginPage;