import React, { useState, useCallback, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { TRootState } from '../../services/reducers';
import { TLocation } from '../../services/types';
import { forgotPasswordRequest } from '../../services/api';
import { authRequest, authFailed, forgotPasswordSuccess } from '../../services/actions/profile';

import style from './forgot-password.module.css';

const ForgotPasswordPage = () => {
  const location: TLocation = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile: any = useSelector<TRootState>(state => state.profile);
  const token = localStorage.getItem('refreshToken');

	const [form, setValue] = useState({ email: '' });
	
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  const forgotPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

			dispatch(authRequest);
			forgotPasswordRequest(form).then(data => {
				dispatch(forgotPasswordSuccess(data));
				history.replace({ pathname: '/reset-password' });
			})
			.catch((e: number | string | null) => {
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
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
			<form onSubmit={forgotPassword} className={style.form}>
				<div className='pt-6'>
					<Input
						name='email'
						placeholder={'Укажите e-mail'}
						onChange={onChange}
						value={form.email}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<div className='pt-6'>
					<Button type="primary" size="large">
						Восстановить
					</Button>
				</div>
			</form>
			<p className='text text_type_main-default text_color_inactive pt-20'>Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link></p>
		</main>
  );
}

export default ForgotPasswordPage;