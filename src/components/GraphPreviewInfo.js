import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import { connect } from 'react-redux';
import { Bars, Pulse } from 'react-native-loader';
import { SmoothLine } from 'react-native-pathjs-charts';
import Icon from 'react-native-vector-icons/FontAwesome';


import Base from './Base';
import SmallGraph from './SmallGraph';

import api from '../scripts/api';
import { getPercentChange, roundNumber } from '../scripts/formatter';
import { fetchGraphData, getCurrentPrice, updatePriceChange} from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';




class GraphPreviewInfo extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('calculatePercentChange');
        this.state = {
            priceChange: 0,
        }
        
    }
    calculatePercentChange() {
       
        var change = getPercentChange(this.props.y)
        
        this.props.updatePriceChange(change)
        
    }

    componentWillReceiveProps(nextProps) {
        
        if (this.props.y.length < 1 && nextProps.y.length > 1) {
            var change = getPercentChange(nextProps.y);
            this.props.updatePriceChange(change)
        }
        
    }

    render() {
        
       
        var check = this.props.priceChange
        var priceChange = check > 0;

       
        var changeColor = priceChange ? {color: colors.green} : {color: colors.red};

        var changeIcon = priceChange ? 'caret-up' : 'caret-down';

        return (
           
         <View style={styles.textContainer}>
            <View style={styles.infoContainer}>
                
                <View style={styles.priceChange}>
                    <Text style={[styles.stat, {...changeColor}]}>

                        {
                            this.props.data.length > 0 ?
                            this.props.priceChange
                            :
                            'N/A'
                        }%
                    </Text>
                    <Icon
                        name={changeIcon}
                        style={[styles.icon, {...changeColor}]}
                    />

                </View>
                <Text style={styles.info}>
                    7 Day Price Growth
                </Text>
            </View>

            <View  style={styles.divider}/>

            <View style={styles.infoContainer}>
                
                <Text style={styles.stat}>
                   ${
                        this.props.currentPrice !== null ?
                        this.props.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : 
                        'N/A'
                    }
                </Text>
                <Text style={styles.info}>
                    Current Price
                </Text>
            </View>

            <View  style={styles.divider}/>
        
            <View style={styles.infoContainer}>
                
                <Text style={styles.stat}>
                    ${
                        this.props.marketCap !== null ?
                        roundNumber(this.props.marketCap, 1)
                        :
                        'N/A'
                    }
                </Text>
                <Text style={styles.info}>
                    Market Cap
                </Text>
            </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        height: '20%',
        width: '100%',
        ...mixins.row,
        ...mixins.center,
        
    },
    infoContainer: {
        height: mixins.fullHeight.height * .08,
        flex: 1,
        ...mixins.column,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        width: 2,
        height: mixins.fullHeight.height * .1,
        backgroundColor: colors.setTeal,
    },
    textInfo: {
        color: colors.black,
    },
    info:  {
        color: colors.black,
        textAlign: 'center',
        ...fonts.bookMicro,
    },
    icon: {
        ...fonts.bookMedium,
        marginLeft: 6,
    },
    stat:{
        color: colors.accent,
        ...fonts.bookMedium
    },
    cap: {
        color: colors.accent,
        ...fonts.bookMicro
    },
    priceChange: {
        ...mixins.row,
        ...mixins.center,
    },
});

function mapStateToProps({currency}) {
    return {
        data: currency.xData,
        y: currency.yData,
        ticker: currency.ticker,
        currentPrice: currency.currentPrice,
        name: currency.name,
        priceChange: currency.priceChange,
        marketCap: currency.marketCap,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)),
        updatePriceChange: (change) => dispatch(updatePriceChange(change)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPreviewInfo);
