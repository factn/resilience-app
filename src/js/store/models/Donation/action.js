export const DONATIONS_GET_SUCCESS = 'donations GET success';
//TODO if needed for network, just an example
//export const DONATIONS_GET_REQUEST = 'donations GET request';
//export const DONATIONS_GET_FAILURE = 'donations GET failure';

export function donationsGetSuccess(donations) {
    return {
        type: DONATIONS_GET_SUCCESS,
        donations: donations
    };
}
