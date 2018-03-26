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
					modalContent } = this.props;
		
		let clas = modalIsOpen ? "modal-wrap open-modal" : "modal-wrap";
		
		return (
			<section className={clas}>
				<button className="modal-close-btn btn-lite" onClick={() => closeModalFunction()}>
					<span>Close </span>
					<Icon icon="times" />
				</button>

				{typeof modalContent !== "undefined" &&
					<Modal name={openModalName}
						content={modalContent} />
				}
			</section>
		);
	}
}