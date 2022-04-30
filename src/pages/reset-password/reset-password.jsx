import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPasswordRequest } from '../../services/api';
import { authRequest, authFailed, resetPasswordSuccess } from '../../services/actions/profile';

import style from './reset-password.module.css';

const ResetPasswordPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

	const [form, setValue] = useState({ password: '', token: '' });
	
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
	
  let resetPassword = useCallback(
    e => {
      e.preventDefault();

			dispatch(authRequest);
			resetPasswordRequest(form).then(data => {
				dispatch(resetPasswordSuccess(data));
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
			<h1 className='text text_type_main-medium'>Восстановление пароля</h1>
			<div className='pt-6'>
				<PasswordInput 
					name='password'
					placeholder={'Введите новый пароль'}
					value={form.password}
					onChange={onChange}
				/>
			</div>
			<div className='pt-6'>
				<Input
					name='token'
					placeholder={'Введите код из письма'}
					onChange={onChange}
					value={form.token}
					errorText={'Ошибка'}
					size={'default'}
				/>
			</div>
			<div className='pt-6'>
				<Button type="primary" size="large" onClick={resetPassword}>
					Сохранить
				</Button>
			</div>
			<p className='text text_type_main-default text_color_inactive pt-20'>Вспомнили пароль? <Link to='/login' className={style.link}>Войти</Link></p>
		</main>
  );
}

export default ResetPasswordPage;