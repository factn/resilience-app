/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';

// Local JS
import Modal from './Modal';
/*** [end of imports] ***/

export default class ModalWrap extends Component {
	render () {
		let { modalIsOpen,
					closeModalFunction,
					openModalName,
					modalContent,
					lat,
					lon,
					openMapPicker } = this.props;

		let style = modalIsOpen
			? { top: document.documentElement.scrollTop }
			: { top: "-100vh" };
		
		return (
			<section className={modalIsOpen ? "modal-wrap open-modal" : "modal-wrap"} style={style}>
				<button className="modal-close-btn btn-lite" onClick={() => closeModalFunction()}>
					<span>Close </span>
					<Icon icon="times" />
				</button>

				{typeof modalContent !== "undefined" &&
					<Modal name={openModalName}
							content={modalContent}
							openMapPicker={openMapPicker}
							lat={lat}
							lon={lon} />
				}
			</section>
		);
	}
}