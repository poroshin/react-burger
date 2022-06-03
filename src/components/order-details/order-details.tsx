import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../../services/reducers';
import Modal from '../modal/modal';

import style from './order-details.module.css';
import successIcon from '../../images/graphics.svg';

type TOrderDetails = {
  onClose: () => void;
}

const OrderDetails: FC<TOrderDetails> = ({onClose}) => {
	const orderDetail: any = useSelector<TRootState>(state => state.order);

  return (
		<Modal onClose={onClose}>
			<div className={style.modal}>
				<h2 className='text text_type_digits-large pt-30'>{orderDetail.orderNumber}</h2>
				<p className='text text_type_main-default pt-8 pb-15'>{orderDetail.name}</p>
				<img className={style.img} src={successIcon} alt='success' />
				<p className='text text_type_main-default pt-15'>Ваш заказ начали готовить</p>
				<p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
			</div>
		</Modal>
  );
}

export default OrderDetails;
