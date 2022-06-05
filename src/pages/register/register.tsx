import React, { useState, useCallback, FormEvent } from 'react';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector, useDispatch } from '../../services/hooks';
import { TLocation } from '../../services/types';
import { registerThunk } from '../../services/actions/profile';

import style from './register.module.css';

const RegisterPage = () => {
  const location: TLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileReducer);
  const token = localStorage.getItem('refreshToken');

	const [form, setValue] = useState({ name: '', email: '', password: '' });
	
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  const register = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
			dispatch(registerThunk(form, history));
    },
    [form]
  );

	if(profile.isLoggedIn && token){
    return <Redirect to={location.state?.from || '/profile'} />;
	}

  return (
		<main className={style.main}>
			<h1 className='text text_type_main-medium'>Регистрация</h1>
			<form onSubmit={register} className={style.form}>
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
					<Button type="primary" size="large">
						Зарегистрироваться
					</Button>
				</div>
			</form>
			<p className='text text_type_main-default text_color_inactive pt-20'>Уже зарегистрированы? <Link to='/login' className={style.link}>Войти</Link></p>
		</main>
  );
}

export default RegisterPage;