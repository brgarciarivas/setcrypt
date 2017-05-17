
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Base from './Base';

import { fetchCurrencyData } from '../actions/Currency';
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
    componentDidMount(){

        var params = {

            ticker: this.props.ticker,
            currency: this.props.currency,
            market: this.props.market,
    
        }

        this.props.fetchCurrencyData(params)
    }
    render() {
        console.log('GraphDetail')
        console.log(this.props)
        return (
            <View style={styles.root}>
                <Text
                    state={this.state.url}
                >make it till 21</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        marginTop: variables.HEADER_HEIGHT,
        ...mixins.fullHeight,
        ...mixins.column,
        ...mixins.flexStart,
        backgroundColor: colors.lightGray
    },
});


function mapStateToProps({currency}) {
    return {
        data: currency.dataSet,
        currency: currency.currency,
        ticker: currency.ticker,
        currentPrice: currency.currentPrice,
        name: currency.name,
        market: currency.market
    };
}

function mapDispatchToProps(dispatch) {
    return {
       fetchCurrencyData: (params) => dispatch(fetchCurrencyData(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetail);


