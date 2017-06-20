import moment from 'moment';
import * as types from '../constants/actionTypes';

import api from '../scripts/api';



//NOTE GETTING THE CLOSE PRICE
export function fetchGraphDataSet (params) {
    return dispatch => {
        dispatch(clearGraphData());
        api.graph({
            query: `{
                graphData(
                    currency: "${params.ticker}", 
                    start: "${params.time}"
                ) {
                    graphData{
                        date,
                        price
                    },
                    high,
                    low,
                    volume,
                    weightedAverage   
                }
            }`
        }).then((data) => {
           
            var xData = [];
            var yData = [];

            var length = data.graphData.graphData.length;
            var unit;

            switch (params.time) {
                case 'Day':
                    unit = 'h';
                break;
                case 'Week':
                    unit = 'dd';
                break;
                case 'Month':
                    unit = 'dd';
                break;
                case 'Year':
                    unit = 'mm';
                break;

            }

            for( var i = 0; i < length; i++) {
                xData.push(moment.unix(data.graphData.graphData[i].date).format(unit));
                yData.push({'y': data.graphData.graphData[i].price});
            }

            var dataSet = { x: xData, y: yData};

            console.log(dataSet)
            dispatch(receiveVolume(data.graphData.volume));
            dispatch(receiveHighLow({high: data.graphData.high, low: data.graphData.low}));
            dispatch(receiveGraphDatSet(dataSet));
            dispatch(receiveWeightedAverage(data.graphData.weightedAverage));
        }).catch((err) => {
            console.log('err')
            console.log(err)
        });
    };
};

export function clearGraphData() {
    return {
        type: types.CLEAR_GRAPH_DATA,
    }
}

export function receiveWeightedAverage(data) {
    return {
        type: types.RECEIVE_WEIGHTED_AVERAGE,
        data
    }
}

export function receiveVolume(data) {
    return {
        type: types.RECEIVE_VOLUME,
        data
    }
}

export function receiveHighLow(data) {
    return {
        type: types.RECEIVE_HIGH_LOW,
        data
    }
}

export function receiveTimeSelection (time) {
    return {
        type: types.RECEIVE_TIME_SELECTION,
        time,
    }
}

export function receiveGraphDatSet (graphDataSet) {
    return {
        type: types.RECEIVE_GRAPH_DETAIL_SET,
        graphDataSet
    }
}