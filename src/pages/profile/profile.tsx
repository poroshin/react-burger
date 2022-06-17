import React, { useState, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import ProfileMenu from '../../components/profile-menu/profile-menu';
import { useSelector, useDispatch } from '../../services/hooks';
import { TUserForm, TForm } from '../../services/types';
import { setUserThunk } from '../../services/actions/profile';

import style from './profile.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);

  const [isEdited, setIsEdited] = useState(false);
	const [form, setValue] = useState<TForm>({ name: '', email: '', password: '' });

  useEffect(() => {
    setValue({ name: profile.user.name ? profile.user.name : '', email: profile.user.email ? profile.user.email : '', password: '' });
  }, []);
	
  const setUser = (form: TUserForm) => {
    dispatch(setUserThunk(form));
  };
	
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onClickEdit = () => {
    setIsEdited(true);
  }

  const onSave = () => {
    setUser({ name: form.name, email: form.email });
    setIsEdited(false);
  }

  const onCancel = () => {
    setIsEdited(false);
    setValue({ name: profile.user.name ? profile.user.name : '', email: profile.user.email ? profile.user.email : '', password: '' });
  }

  return (
		<main className={style.main}>
      <div className={style.main__start}>
        <ProfileMenu />
			  <p className='text text_type_main-default text_color_inactive pt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form onSubmit={onSave} className={style.column}>
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
          <Button type="primary" size="medium">
            Сохранить
          </Button>
          <Button type="secondary" size="medium" onClick={onCancel}>
            Отмена
          </Button>
        </div>
        )}
      </form>
      <div className={style.main__end}></div>
		</main>
  );
}

export default ProfilePage;