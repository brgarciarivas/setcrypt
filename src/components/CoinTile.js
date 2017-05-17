import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import Base from './Base';

import { fetchGraphData, getCurrentPrice, updateHomeCoin } from '../actions/Currency';


import { colors, defaults, fonts, mixins, variables } from '../styles';

class CoinTile extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('handleClick');
    }
    handleClick(){
        console.log(this.props)
        var self = this;
        if( this.props.selected === this.props.ticker ) {
            console.log('already this coin ' + this.props.ticker)
        } else {
            console.log('selected coin need to change to ' + this.props.ticker)
            var result = this.props.cryptCurrency.filter(function( coin ) {

                return coin.ticker == self.props.ticker;
            });
            console.log('bubbbllyyy')
            console.log(result)
            var params = {
                ticker: result[0].ticker,
                name: result[0].name,
                currency: this.props.currency,
                time: '7',
                url: result[0].url,
                market: result[0].market
            }
            console.log('params')
            console.log(params)
            this.props.updateHomeCoin(params);
            this.props.getCurrentPrice(params);
            this.props.fetchGraphData(params);
    
        }
    }
    render() {
        var shadow = this.props.crypt === this.props.tk ? 3 : 1;
        return (
            
            <TouchableOpacity
                onPress={this.handleClick}
                style={[styles.root, {...mixins.createShadow(shadow)}]}
            >
                <View >
                    <Image
                        style={styles.image}
                        source={{uri: this.props.url}}
                    />
                    <Text
                        style={styles.text}
                    >
                        {this.props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        width: 90,
        height: 60,
        backgroundColor: colors.white,
       
        borderRadius: 6,
        ...mixins.column,
        ...mixins.spaceAround,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        alignSelf: 'center',
        height: 16,
        width: 16,
    },
    text:  {
        marginTop: '1.5%',
        textAlign: 'center',
        ...fonts.bookTiny
    }
});


function mapStateToProps({ currency, settings }) {
    return {
        selected: currency.ticker,
        cryptCurrency: settings.cryptCurrency,
        currency: currency.currency
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)),
        updateHomeCoin: (params) => dispatch(updateHomeCoin(params))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoinTile);
