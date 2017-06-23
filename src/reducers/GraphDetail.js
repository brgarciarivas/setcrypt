
import * as types from '../constants/actionTypes';

const initialState = {
    xData: [],
    yData: [],
    time: 'Day',
    highLow: null,
    volume: null,
    weightedAverage: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_WEIGHTED_AVERAGE: {
            return {
                ...state,
                weightedAverage: action.data
            }
        }
        case types.RECEIVE_GRAPH_DETAIL_SET: {
            return {
                ...state,
                xData: action.graphDataSet.x,
                yData: action.graphDataSet.y 
            }
        }
        case types.RECEIVE_VOLUME: {
            return {
                ...state,
                volume: action.data,
            }
        }
        case types.RECEIVE_TIME_SELECTION: {
            return {
                ...state,
                time: action.time
            }
        }
        case types.RECEIVE_HIGH_LOW: {
            return {
                ...state,
                highLow: action.data,
            }
        }
        case types.CLEAR_GRAPH_DATA: {
            return {
                ...state,
                xData: [],
                yData: [],
            }
        }
        default:
            return state;

    }
}