import moment from 'moment';
import * as types from '../constants/actionTypes';

import api from '../scripts/api';



//NOTE GETTING THE CLOSE PRICE
export function fetchGraphDataSet (params) {
    return dispatch => {
        api.graph({
            query: `{
                graphData(
                    currency: "${params.ticker}", 
                    start: "${params.time}"
                ) {
                    date,
                    close,
                }
            }`
        }).then((data) => {
           
            var xData = [];
            var yData = [];

            var length = data.graphData.length;
            var unit;
            switch (params.time) {
                case 'Day':
                    unit = 'hh';
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
                xData.push(moment.unix(data.graphData[i].date).format(unit));
                yData.push({'y': data.graphData[i].close});
            }

            var dataSet = { x: xData, y: yData};

            dispatch(updateGraphDatSet(dataSet))
        }).catch((err) => {
            console.log('err')
            console.log(err)
        });
    };
};


export function toggleTimeSelection (time) {
    return {
        type: types.TOGGLE_TIME_SELECTION,
        time,
    }
}

export function updateGraphDatSet (graphDataSet) {
    return {
        type: types.RECEIVE_GRAPH_DETAIL_SET,
        graphDataSet
    }
}