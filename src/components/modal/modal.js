import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import style from './modal.module.css';
import ModalOverlay from '../../components/modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

const Modal = ({children, onClose}) => {
  return createPortal(
		<>
			<div className={style.modal}>
				<button className={style.btnClose} onClick={onClose}>
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
