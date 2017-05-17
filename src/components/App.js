import React from 'react';
import { AppState, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { Router, Scene, Actions, Modal, ActionConst } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//import createSagaMiddleware from 'redux-saga';
import Icon from 'react-native-vector-icons/FontAwesome';

import reducers from '../reducers';
//import rootSaga from '../sagas';


import { fetchGraphData, getCurrentPrice, updateHomeCoin, fetchRedditThread } from '../actions/Currency';



// connects react router to redux to pass scene info
const ReduxRouter = connect()(Router);
// sets up sagas for modularized asyncronicity
//const sagaMiddleware = createSagaMiddleware();


const middleware = [thunk];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);

//sagaMiddleware.run(rootSaga);

// actions

// components
import Base from './Base';
import Splash from './Splash';
import InboxPage from './InboxPage';
import Header from './Header';
import Home from './Home';
import GraphDetail from './GraphDetail';

import { colors, defaults, fonts, mixins, variables } from '../styles';

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'blue'
    },
    tabBar: {
        ...mixins.row,
        height: variables.HEADER_HEIGHT,
        borderTopWidth: 1,
        borderTopColor: colors.primaryLight,
        alignItems: 'center',
        color: colors.primary,
        backgroundColor: colors.secondary
    },
    title: {
        color: colors.primaryDark
    }
});

console.disableYellowBox = true;
 
class App extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
    componentWillMount() {
        var self = this;
        var result = this.props.cryptCurrency.filter(function( coin ) {

            return coin.ticker == self.props.ticker;
        });
        console.log('we mad lit')
        console.log(result[0])

        const {
            updateHomeCoin,
            getCurrentPrice,
            fetchGraphData,
            fetchRedditThread
        } = this.props;
        var params = {
            ticker: result[0].ticker,
            name: result[0].name,
            currency: this.props.currency,
            time: '7',
            url: result[0].url,
            market: result[0].market
        }
        
        updateHomeCoin(params);
        getCurrentPrice(params);
        fetchGraphData(params);
        fetchRedditThread(params)
    }
    componentDidUpdate(prevProps) {
    }
    componentWillUnmount() {
        
    }
    
    
    render() {
        console.log('App render');

        return (
            <ReduxRouter>
                <Scene
                   key='root'
                   sceneStyle={styles.root}
                   navigationBarStyle={styles.navbar}
               >
                   <Scene 
                       key='Home'
                       title='Setcrypt'
                       component={Home}
                       initial
                   />
                   <Scene 
                       key='GraphDetail'
                       title='Setcrypt'
                       component={GraphDetail}
                   />

               </Scene>
            </ReduxRouter>
        );
    }
}

// injects global props at root level
function mapStateToProps({ settings } ) {
    return {
        ticker: settings.ticker,
        currency: settings.currency,
        cryptCurrency: settings.cryptCurrency
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)),
        updateHomeCoin: (params) => dispatch(updateHomeCoin(params)),
        fetchRedditThread: (params) => dispatch(fetchRedditThread(params)),
    };
}

const ReduxApp = connect(mapStateToProps, mapDispatchToProps)(App);

// wraps App in redux provider
export default function AppWrapper() {
    return (
        <Provider store={store}>
            <ReduxApp />
        </Provider>
    );
}