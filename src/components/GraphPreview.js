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
            width: mixins.fullWidth.width * .6,
            height: mixins.fullHeight.height * .2,
            color: '#2980B9',
            margin: {
                top: 22,
                left: 50,
                bottom: 30,
                right: 15
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: false,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: false,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
            <View style={styles.root}>
                <View style={styles.textContainer}>
                    <Text>{this.props.ticker}</Text>
                    <Text>{this.props.currentPrice}</Text>
                    <Text>{this.props.name}</Text>
                </View>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: '30%',
        width: '95%',
        ...mixins.row,
        ...mixins.center,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderRadius: 6,

    },
    textContainer: {
        height: '60%',
        width: '20%',
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'space-around',
        ...fonts.bookMedium,
    },
    graphChart: {
        width: '78%',
        height: '90%',
        ...mixins.row,
        ...mixins.center,
    },
    chart: {
        width: '100%',
        height: '100%',
    }
});

function mapStateToProps({currency}) {
    return {
        data: currency.dataSet,
        ticker: currency.ticker,
        currentPrice: currency.currentPrice,
        name: currency.name,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPreview);
