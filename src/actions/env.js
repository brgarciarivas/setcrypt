import { AsyncStorage } from 'react-native';
import moment from 'moment';
import * as types from '../constants/actionTypes';

import { updateHomeCoin, getCurrentPrice, fetchGraphData, fetchRedditThread, fetchPriceChange, fetchMarketCap } from './Currency';

import api from '../scripts/api';


export function ToggleHomeCoin (params) {
    return dispatch =>  {
        dispatch(updateHomeCoin(params))
        dispatch(getCurrentPrice(params))
        dispatch(fetchGraphData(params))
        dispatch(fetchRedditThread(params))
        dispatch(fetchMarketCap(params))
    }
}