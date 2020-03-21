import * as actions from './action';

export default function (state = {
    donations: ''
}, action) {
    switch (action.type) {
        case actions.DONATIONS_GET_SUCCESS:
            return {...state, donations: action.donations};
        default:
            return state;
    }
}
