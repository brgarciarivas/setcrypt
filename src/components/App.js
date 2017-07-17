import React from 'react';
import { AppState, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { Router, Scene, Actions, Modal, ActionConst } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import io from 'socket.io-client';

//import createSagaMiddleware from 'redux-saga';
import Icon from 'react-native-vector-icons/FontAwesome';

import reducers from '../reducers';
//import rootSaga from '../sagas';

import { API_ROOT } from '../constants';
import { ToggleHomeCoin } from '../actions/env';


// connects react router to redux to pass scene info
const ReduxRouter = connect()(Router);
const sagaMiddleware = createSagaMiddleware();

// sets up sagas for modularized asyncronicity
//const sagaMiddleware = createSagaMiddleware();


const middleware = [thunk, sagaMiddleware];
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
import ViewWeb from './ViewWeb';

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
        const socket = io(API_ROOT);
        // const btc = socket('/BTC');

        // btc.on('BTC', (data) => {
        //     console.log('btc plz')
        //     console
        // })
        console.log(socket)

        socket.on('connect', () => {
          console.log('lit mane!');
        });
        socket.on('btc', (data) => {
            console.log('twitter data')
            console.log(data)
        })


        var self = this;
        var result = this.props.cryptCurrency.filter(function( coin ) {
            return coin.ticker == self.props.ticker;
        });
        

        const {
            ToggleHomeCoin,
        } = this.props;
        var params = {
            ticker: result[0].ticker,
            name: result[0].name,
            currency: this.props.currency,
            time: '7',
            market: result[0].market
        }
       
        ToggleHomeCoin(params);
    }
    componentDidUpdate(prevProps) {
    }
    componentWillUnmount() {
        
    }
    
    
    render() {

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
                    <Scene 
                        key='ViewWeb'
                        title='Setcrypt'
                        component={ViewWeb}
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
        ToggleHomeCoin: (params) => dispatch(ToggleHomeCoin(params)),
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