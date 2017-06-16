
import * as types from '../constants/actionTypes';

const initialState = {
    xData: [],
    yData: [],
    time: 'Day',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_GRAPH_DETAIL_SET: {
            return {
                ...state,
                xData: action.graphDataSet.x,
                yData: action.graphDataSet.y 
            }
        }
        case types.TOGGLE_TIME_SELECTION: {
            return {
                ...state,
                time: action.time
            }
        }
        default:
            return state;

    }
}