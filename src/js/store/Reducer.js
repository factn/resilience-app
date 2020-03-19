import {combineReducers} from 'redux'
import {DonationReducer} from './models/Donation';

export default combineReducers({
  donation: DonationReducer,
})
