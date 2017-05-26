import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import { connect } from 'react-redux';
import Chart from 'react-native-chart';
import { Bars, Pulse } from 'react-native-loader';
import { SmoothLine } from 'react-native-pathjs-charts';

import { fetchGraphData, getCurrentPrice } from '../actions/Currency';
import Base from './Base';

import { colors, defaults, fonts, mixins, variables } from '../styles';

import api from '../scripts/api';


class GraphPreview extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
        
    }

    render() {
        
        let options = {
            width: mixins.fullWidth.width * .84,
            height: mixins.fullHeight.height * .25,
            color: colors.blue,
            margin: {
                top: 5,
                left: 55,
                bottom: 22,
                right: 15
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: false,
                showLines: false,
                showLabels: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 11,
                    fontWeight: true,
                    fill: colors.white,
                }
            },
            axisY: {
                showAxis: false,
                showLines: true,
                showLabels: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 11,
                    fontWeight: true,
                    fill: colors.white,
                }
            }
        }

        return (
            <View style={styles.root}>
                <View style={styles.graphChart}>
                    {
                        this.props.data.length > 0 ? 
                        <SmoothLine data={this.props.data} options={options} xKey='x' yKey='y' />
                        :
                        <Bars
                            style={defaults.buffer}
                            size={variables.LOADER_SIZE * 0.5}
                            color={colors.primary}
                        />
                    }
                </View>
                 <View style={styles.textContainer}>
                    <Text style={styles.price}>{this.props.currentPrice}</Text>
                    <Text style={styles.ticker}>{this.props.ticker}</Text>
                    <Text style={styles.ticker}>{this.props.priceChange}</Text>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: mixins.fullHeight.height * .38,
        width: '95%',
        ...mixins.column,
        ...mixins.center,
        justifyContent: 'flex-start',
        backgroundColor: colors.mainBlack,
        borderRadius: 6,

    },
    textContainer: {
        height: '6%',
        width: '70%',
        ...mixins.row,
        alignItems: 'center',
        justifyContent: 'space-around',
        ...fonts.bookMedium,
    },
    graphChart: {
        ...mixins.row,
        ...mixins.center,
    },
    textInfo: {
        color: colors.blue,
    },
    price:  {
        color: colors.green,
    },
    ticker: {
        color: colors.red,
    }
});

function mapStateToProps({currency}) {
    return {
        data: currency.dataSet,
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
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPreview);
