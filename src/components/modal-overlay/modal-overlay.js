import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

const ModalOverlay = ({onClose}) => {
	const escCloseModal = (event) => {
		if (event.key === 'Escape') {
			onClose();
		}
	}
	useEffect(() => {
		document.addEventListener('keydown', escCloseModal);
		return () => {
			document.removeEventListener('keydown', escCloseModal);
		}
	}, []);

  return (
		<div className={style.overlay} onClick={onClose}></div>
  );
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
