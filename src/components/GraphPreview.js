import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import { connect } from 'react-redux';
import Chart from 'react-native-chart';

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
                        <Chart 
                            style={styles.chart}
                            data={[this.props.data]}
                            type='line'
                            lineWidth={7}
                            dataPointRadius={4}
                            xAxisHeight={variables.SCREEN_HEIGHT*.022}
                            showDataPoint
                            yAxisWidth={variables.SCREEN_WIDTH*.1}
                            hideVerticalGridLines
                            hideHorizontalGridLines
                            tightBounds
                        /> :
                        <Text>Graph</Text>
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
        width: '20%',
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'center'
    },
    graphChart: {
        width: '78%',
        height: '90%',
        ...mixins.row,
        justifyContent: 'flex-end'

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
