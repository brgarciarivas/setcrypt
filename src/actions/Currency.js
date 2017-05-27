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

export function fetchMarketCap (params) {
    return dispatch => {
        api.getExt(`https://coinmarketcap-nexuist.rhcloud.com/api/${params.ticker}/market_cap`)
        .then(payload =>  {
            var currency = params.currency.toLowerCase()
            var cap = payload[currency];

            dispatch(updateMarketCap(cap))
        })
    }
}

export function fetchRedditThread (params) {
    if (params.name == 'Dash') {
        params.name = 'dashpay';
    }
    return dispatch =>  {
        api.getExt(`https://www.reddit.com/r/${params.name}.json`)
        .then(payload => {
            console.log('thread')
            console.log(payload.data.children)
            payload.data.children.shift();
            console.log(payload.data.children)
            dispatch(updateReddit(payload.data.children))
        })
    }
}

export function fetchCurrencyData (params) {
 
    return dispatch => {
        api.getExt(`https://min-api.cryptocompare.com/data/generateAvg?fsym=${params.ticker}&tsym=${params.currency}&markets=${params.market}`)
        .then(payload => {
            console.log('payload')
            console.log(payload);
        })
    }
}


export function fetchPriceChange (params) {
    return dispatch => {
        api.getExt(`https://coinmarketcap-nexuist.rhcloud.com/api/${params.ticker}/change`)
        .then(payload => {
        console.log(payload)
        dispatch(updatePriceChange(payload))
        })
    }
}

export function fetchGraphData (params) {
    return dispatch => {
        api.getExt(`https://min-api.cryptocompare.com/data/histoday?fsym=${params.ticker}&tsym=${params.currency}\&limit=${params.time}`)
        .then(payload => {
       
            var data = [];
            var length = payload.Data.length;
            var info = payload.Data;
            for (var i = 0; i < length; i++) {
                var day = moment(new Date(info[i].time * 1000)).utc();
                data.push({'x': Number(day.format('DD')), 'y': info[i].close})
            }
            console.log('data graph')
            console.log(data)
            console.log('shift that bitch')
            //data.shift()
            console.log(data)
            dispatch(updateDataSet([data]))
        })
    };  
}

export function highLowPrice (params) {
    return dispatch => {
        //https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=7&aggregate=7&e=CCCAGG
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

export function updateMarketCap (cap) {
    return {
        type: types.UPDATE_MARKET_CAP,
        cap
    }
}

export function updatePriceChange (change) {
    return {
        type: types.UPDATE_PRICE_CHANGE,
        change
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
    return {
        type: types.UPDATE_DATA_SET,
        dataSet: dataSet
    }
}
