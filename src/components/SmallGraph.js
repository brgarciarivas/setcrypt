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
import { StockLine } from 'react-native-pathjs-charts';


import Base from './Base';

import { getPercentChange } from '../scripts/formatter';
import { fetchGraphData, getCurrentPrice, updatePriceChange} from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';




class SmallGraph extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
        
    }
    render() {
        
        let options = {
            width: mixins.fullWidth.width * .78,
            height: mixins.fullHeight.height * .3,
            color: colors.accent,
            margin: {
                top: 5,
                left: 55,
                bottom: 22,
                right: 5
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
                    fontWeight: false,
                    fill: colors.cryptGray,
                }
            },
            axisY: {
                showAxis: false,
                showLines: false,
                showLabels: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 11,
                    fontWeight: false,
                    fill: colors.cryptGray,
                }
            }
        }
        

        return (
            <View style={styles.root}>
                {
                    this.props.data.length > 0 ? 
                    <StockLine data={this.props.data} options={options} xKey='x' yKey='y' />
                    :
                    <Bars
                        style={defaults.buffer}
                        size={variables.LOADER_SIZE * 0.5}
                        color={colors.primary}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.row,

    },
});

function mapStateToProps({currency}) {
    return {
        data: currency.dataSet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallGraph);
