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


import { ToggleHomeCoin } from '../actions/env';


import { colors, defaults, fonts, mixins, variables } from '../styles';

class CoinTile extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('handleClick', 'getImage');
    }
    handleClick(){
        var self = this;
        if( this.props.selected === this.props.ticker ) {
            console.log('already this coin ' + this.props.ticker)
        } else {
           
            var result = this.props.cryptCurrency.filter(function( coin ) {

                return coin.ticker == self.props.ticker;
            });
           
            var params = {
                ticker: result[0].ticker,
                name: result[0].name,
                currency: this.props.currency,
                time: '7',
                market: result[0].market,
            }
          
            this.props.ToggleHomeCoin(params);
    
        }
    }
    getImage() {
        var images = {
            BTC: require(`../images/smallBTC.png`),
            DASH: require(`../images/smallDASH.png`),
            ETH: require(`../images/smallETH.png`),
            LTC: require(`../images/smallLTC.png`),
            XMR: require(`../images/smallXMR.png`),
            XRP: require(`../images/smallXRP.png`),
        };
        
        return images[this.props.ticker]
    }
    render() {

        var shadow = this.props.selected === this.props.ticker ? 3 : 1;



        return (
            
            <TouchableOpacity
                onPress={this.handleClick}
                style={[styles.root, {...mixins.createShadow(shadow)}]}
            >
                <View >
                    <Image
                        style={styles.image}
                        source={this.getImage()}
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
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        ...mixins.column,
        ...mixins.center,
        marginLeft: 10,
        marginRight: 10,
        // borderWidth: 2,
        // borderColor: colors.lightBlue,
    },
    image: {
        alignSelf: 'center',
        height: 16,
        width: 16,
    },
    text:  {
        marginTop: '1.5%',
        textAlign: 'center',
        ...fonts.bookTiny,
        color: colors.black
    }
});


function mapStateToProps({ currency, settings }) {
    return {
        selected: currency.ticker,
        cryptCurrency: settings.cryptCurrency,
        currency: currency.currency,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ToggleHomeCoin: (params) => dispatch(ToggleHomeCoin(params))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CoinTile);
