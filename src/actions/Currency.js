import { AsyncStorage } from 'react-native';
import moment from 'moment';
import * as types from '../constants/actionTypes';

import api from '../scripts/api';

export function selectedCurrency(params) {
    return {
        type: types.HANDLE_CURRENCY,
        currency: params.tk
    };
}

export function fetchRedditThread (params) {
    return dispatch =>  {
        api.getExt(`https://www.reddit.com/r/${params.name}.json`)
        .then(payload => {
            console.log('payload for fetchRedditThread')
            console.log(payload)
            dispatch(updateReddit(payload.data.children))
        })
    }
}

export function fetchCurrencyData (params) {
    console.log(params)
    console.log('params')
    return dispatch => {
        api.getExt(`https://min-api.cryptocompare.com/data/generateAvg?fsym=${params.ticker}&tsym=${params.currency}&markets=${params.market}`)
        .then(payload => {
            console.log('payload')
            console.log(payload);
        })
    }
}

export function fetchGraphData (params) {
    return dispatch => {
        api.getExt(`https://min-api.cryptocompare.com/data/histoday?fsym=${params.ticker}&tsym=${params.currency}\&limit=${params.time}`)
        .then(payload => {
            console.log('payload for graph data')
            console.log(payload)
            var dataSet = payload.Data.map((data, index) => {
                var day = moment(new Date(data.time * 1000)).utc();
                return [ day.format('DD'), data.close];
            })
            dispatch(updateDataSet(dataSet))
        })
    };  
}

export function highLowPrice (params) {
    return dispatch => {
        https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=7&aggregate=7&e=CCCAGG
        api.getExt(`https://min-api.cryptocompare.com/data/histoday?fsym=${params.ticker}&tsym=${params.currency}\&limit=${params.time}`)
        .then(payload => {
            
            var dataSet = payload.Data.map((data, index) => {
                var day = moment(new Date(data.time * 1000)).utc();
                day = day.format('MMM DD')
                day = parseInt(day)
                return [ day, data.close];
            })
            dispatch(updateDataSet(dataSet))
        })
    }
}

export function getCurrentPrice (params) {
    return dispatch => {
        api.getExt(`https://min-api.cryptocompare.com/data/price?fsym=${params.ticker}&tsyms=${params.currency}`)
        .then(payload => {
            dispatch(updatePrice(payload[params.currency]))
        })
    }
}

export function updateReddit (thread) {
    return {
        type: types.UPDATE_REDDIT_THREAD,
        thread
    }
}

export function updateHomeCoin (params) {
    return {
        type: types.UPDATE_COIN,
        ticker: params.ticker,
        name: params.name,
        url: params.url,
        market: params.market
    };   
}

function updatePrice (currentPrice) {
    return {
        type: types.CURRENCY_PRICE,
        currentPrice
    }
}
function updateDataSet(dataSet) {
    console.log('dataSet')
    console.log(dataSet)
    return {
        type: types.UPDATE_DATA_SET,
        dataSet: dataSet
    }
}
