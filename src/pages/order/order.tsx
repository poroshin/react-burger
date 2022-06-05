import React from 'react';
import OrderModal from '../../components/order-modal/order-modal';

import style from './order.module.css';

const OrderPage = () => {
  return (
		<main className={style.main}>
      <OrderModal />
		</main>
  );
}

export default OrderPage;