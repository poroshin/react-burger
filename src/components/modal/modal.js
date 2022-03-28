import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../../components/modal-overlay/modal-overlay';

import style from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, onClose}) => {
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

  return createPortal(
		<>
			<div className={style.modal}>
				<button className={style.modal__button} onClick={onClose}>
					<CloseIcon type="primary" />
				</button>
				{children}
			</div>
			<ModalOverlay onClose={onClose} />
		</>,
		modalRoot
  );
}
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal;
