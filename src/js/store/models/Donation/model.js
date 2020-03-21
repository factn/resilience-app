import * as actions from './action'

const credentials = "email=admin@example.com&password=password"

const API = {
  getDonations: {
    url: `/donations?${credentials}`,
    method: 'GET'
  }
}

class Donation{
    getDonations(){
        return (dispatch) => {
            fetch(API.getDonations.url, {
                method: API.getDonations.method,
            })
            .then(payload => {
                dispatch(actions.donationsGetSuccess(payload.donations))
            })
        }
    }
}

export default new Donation();
// example of use
// this.props.dispatch(Donation.getDonations())
