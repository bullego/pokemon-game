import React, { useEffect, useRef } from 'react';
import stl from './Modal.module.css';
import classnames from 'classnames';

const Modal = ({title, children, onCloseModal, isOpenModal}) => {
	const modalRef = useRef();

	useEffect(() => {
		document.body.style.overflow = isOpenModal ? 'hidden' : null;
	}, [isOpenModal]);

	const handleCloseModal = () => {
		onCloseModal && onCloseModal();
	}

	const handleClickRootModal = (e) => {
		if(!modalRef.current.contains(e.target)) {
			handleCloseModal();
		}
	}

	return (
		<div className={classnames(stl.root, {[stl.open]: isOpenModal})}
				 onClick={handleClickRootModal}>
			<div className={stl.modal}
					 ref={modalRef}>
					<div className={stl.head}>
							{title}
							<span className={stl.btnClose}
										onClick={handleCloseModal}>
							</span>
					</div>
					<div className={stl.content}>
							{children}
					</div>
			</div>
		</div>
	)
}

export default Modal;