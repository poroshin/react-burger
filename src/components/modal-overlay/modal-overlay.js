import React from 'react';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css';

const ModalOverlay = ({onClose}) => {
  return (
		<div className={style.overlay} onClick={onClose}></div>
  );
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
