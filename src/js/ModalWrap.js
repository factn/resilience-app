/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
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
					Close <Icon icon={faTimes} />
				</button>

				{/* {typeof modalContent !== undefined && Object.keys(modalContent).length > 0 &&
					<article className={`${openModalName.toString().toLowerCase()}-modal modal`}>
						<header className="modal-header">
							<h2>{modalContent.title}</h2>
						</header>
						{modalContent.body}
					</article>
				} */}
			</section>
		);
	}
}