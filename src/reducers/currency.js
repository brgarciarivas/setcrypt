import * as types from '../constants/actionTypes';

const initialState = {
    currency: 'USD',
    ticker: '',
    name: '',
    reddit: [],
    week: {
        high: '',
        low: '',
    },
    picUrl: '',
    lgPic: '',
    xData: [1,2,3,4,5],
    yData: [1,2,3,4,5],
    currentPrice: null,
    market: '',
    priceChange: 0,
    marketCap: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case types.CLEAR_GRAPH_PREVIEW_DATA: {
        return {
            ...state,
            xData: [],
            yData: [],
        }
    }
    case types.UPDATE_MARKET_CAP: {
        return {
            ...state,
            marketCap: action.cap
        }
    }
    case types.UPDATE_PRICE_CHANGE: {
        return {
            ...state,
            priceChange: action.change
        }
    }
    case types.UPDATE_REDDIT_THREAD:
        return {
            ...state,
            reddit: action.thread
        }
    case types.UPDATE_DATA_SET:
        return {
            ...state,
            xData: action.dataSet.x,
            yData: action.dataSet.y   
        }
    case types.CURRENCY_PRICE:
        return {
            ...state,
            currentPrice: action.currentPrice
        }
    case types.UPDATE_COIN:
        console.log(action)
        return {
            ...state,
            ticker: action.ticker,
            name: action.name,
            picUrl: action.url,
            market: action.market,
            lgPic: action.pic,
        }
        default:
            return state;

    }
}