/*** IMPORTS ***/
// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class DoerTab extends Page {
	constructor(props) {
		super(props)

		this.state = {
			title: "Work",
			pageStyle: "home-tab",
			navMenu: true,
      userId: 1,
      scenariosInList: 3
		}
	}
}
