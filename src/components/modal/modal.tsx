import React, { FC, useEffect } from 'react';
import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './modal.module.css';

const modalRoot = document.getElementById("react-modals") as HTMLDivElement;

type TModal = {
  onClose: () => void;
}

const Modal: FC<TModal> = ({children, onClose}) => {
	const escCloseModal = (event: KeyboardEvent) => {
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

export default Modal;
