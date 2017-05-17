import { combineReducers } from 'redux';

import env from './env';
import currency from './currency';
import settings from './settings';
import routes from './routes';

export default combineReducers({
    env,
    currency,
    settings,
    routes,
});