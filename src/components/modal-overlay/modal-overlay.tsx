import React from 'react';

import style from './modal-overlay.module.css';

type TModalOverlay = {
  onClose: () => void;
}

const ModalOverlay = ({onClose}: TModalOverlay) => {
  return (
		<div className={style.overlay} onClick={onClose}></div>
  );
}

export default ModalOverlay;
