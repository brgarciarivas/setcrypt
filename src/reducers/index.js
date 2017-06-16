import { combineReducers } from 'redux';

import env from './env';
import currency from './currency';
import settings from './settings';
import routes from './routes';
import GraphDetail from './GraphDetail';

export default combineReducers({
    env,
    currency,
    settings,
    routes,
    GraphDetail,
});