/*** IMPORTS ***/
// Local JS
import Page from "./Page"
/*** [end of imports] ***/

export default class Info extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Overview",
			navMenu: true,
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1
		}
		this.inputs = [
			{
				inputType: "submit",
				labelPhrase: "Donate",
				goToPath: `/${this.props.match.params.scenarioId}/donator`,
				responseType: "neutral"
			}
		]
	}
}
