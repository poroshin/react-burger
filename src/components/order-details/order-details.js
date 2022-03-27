import React from 'react';
import PropTypes from 'prop-types';
import style from './order-details.module.css';
import Modal from '../../components/modal/modal';
import successIcon from '../../images/graphics.svg';
import { orderDetailPropTypes } from '../../utils/constants';

const OrderDetails = ({onClose, orderDetail}) => {
  return (
		<Modal onClose={onClose}>
		<div className={style.modal}>
			<h2 className='text text_type_digits-large pt-30'>{orderDetail.id}</h2>
			<p className='text text_type_main-default pt-8 pb-15'>детали ингредиента</p>
			<img className={style.img} src={successIcon} />
			<p className='text text_type_main-default pt-15'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive pt-2'>Дождитесь готовности на орбитальной станции</p>
		</div>
		</Modal>
  );
}
OrderDetails.propTypes = {
  orderDetail: orderDetailPropTypes.isRequired,
  onClose: PropTypes.func.isRequired
}

export default OrderDetails;
