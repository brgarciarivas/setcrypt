import * as types from '../constants/actionTypes';

const initialState = {
    currency: 'USD',
   
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_CURRENCY:
        return {
            ...state,
            currency: action.currency,
        };
    default:
        return state;
    }
}