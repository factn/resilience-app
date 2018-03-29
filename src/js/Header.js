/*** IMPORTS ***/
// Module imports
import React, { Component }	from 'react';
import Icon									from '@fortawesome/react-fontawesome';
/*** [end of imports] ***/

export default class Header extends Component {
	render () {
		let { userFirstName,
					menuIsOpen,
					openMenuFunction,
					openModal,
					menuList,
					closeMenuFunction,
					versionNumber } = this.props;

		let userInfoArea;

		if (userFirstName !== "") {
			userInfoArea = (
				<div className="user-info-area">
					<Icon className="user-icon" icon="user" />
					<div className="user-name">{toFirstCap(userFirstName)}</div>
				</div>
			)
		} else {
			userInfoArea = (
				<div className="user-info-area">
					<Icon className="user-icon" icon="question" />
					<div className="user-name not-signed-in" onClick={() => openModal("login")}>Please sign in</div>
				</div>
			)
		}

		return (
			<header className="app-header">
				<nav className="menu">
					<button className="btn-lite menu-toggle-btn" onClick={() => openMenuFunction()}>
						<Icon icon="bars" />
					</button>

					<section className={menuIsOpen ? "menu-drawer open-drawer" : "menu-drawer"}>
						{userInfoArea}

						<ul className="menu-list">
							{Object.keys(menuList).map(_label =>
								<li className="menu-item" key={_label}>
									<button className="btn-lite" onClick={menuList[_label]}>{_label}</button>
								</li>
							)}
						</ul>

						<button className="menu-close-btn btn-lite" onClick={() => closeMenuFunction()}>
							<Icon icon="times" />
						</button>

						<div className="subheader-content">
							<div className="copy">&copy; {new Date().getFullYear()}</div>
							<div className="version">{versionNumber}</div>
						</div>
					</section>
				</nav>

				<h1 className="title">{userFirstName !== "" ? `Hey there, ${toFirstCap(userFirstName)}` : "Hello!"}</h1>
			</header>
		);
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1);