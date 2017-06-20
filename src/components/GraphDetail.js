
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    processColor

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {LineChart} from 'react-native-charts-wrapper';
import update from 'immutability-helper';

import Base from './Base';
import MainGraph from './MainGraph';
import TimeSelection from './TimeSelection';
import GraphDetailInfo from './GraphDetailInfo';

import { fetchGraphDataSet } from '../actions/GraphDetail';

//import { fetchCurrencyData } from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class GraphDetail extends Base {
    static renderNavigationBar(props) {
        return (
            <View style={defaults.navBar}>
                <IconButton
                    iconName='chevron-left'
                    onPress={() => Actions.Home({ type: 'push' })}
                />
                <Text style={defaults.navBarTitle}>{props.title}</Text>
                <IconButton
                    iconName='gear'
                    iconStyle={defaults.navNoIcon}
                    onPress={() => Actions.GraphDetail({ type: 'push' })}
                />
            </View>
        );
    }
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
   
    componentDidMount() {

        var params = {

            ticker: this.props.ticker,
            currency: this.props.currency,
            market: this.props.market,
            time: this.props.time,
        }

        this.props.fetchGraphDataSet(params)
         
    }
    render() {
        console.log('GraphDetail')
        console.log(this.props)
        return (
            <View style={styles.root}>
                <View style={styles.container}>
                    
                    <TimeSelection/>
                    <MainGraph/>
                    <View style={styles.coin}>
                        <Text style={styles.coinTitle}>{this.props.name}</Text>
                        <Text style={styles.coinSubtitle}>{this.props.ticker}</Text>
                    </View>
                    <GraphDetailInfo/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        marginTop: variables.HEADER_HEIGHT,
        ...mixins.fullHeight,
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.secondaryDark,
    },
    container: {
        marginTop: 16,
        width: '95%',
        height: '95%',
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        ...mixins.createShadow(1),
    },
    coin: {
        marginTop: '4%',
        height: 50,
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    coinTitle: {
        ...fonts.bookSmall,
        color: colors.accent,
    },
    coinSubtitle: {
        color: colors.setTeal,
        ...fonts.bookTiny,
    }
});


function mapStateToProps({currency, GraphDetail}) {
    return {
        ticker: currency.ticker,
        name: currency.name,
        time: GraphDetail.time,
    };
}

function mapDispatchToProps(dispatch) {
    return {
       fetchGraphDataSet: (params) => dispatch(fetchGraphDataSet(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetail);


