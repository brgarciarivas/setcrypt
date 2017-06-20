import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    processColor
} from 'react-native';
import { connect } from 'react-redux';
import Chart from 'react-native-chart';
import { Bars, Pulse } from 'react-native-loader';
import { StockLine } from 'react-native-pathjs-charts';
import {LineChart} from 'react-native-charts-wrapper';


import Base from './Base';

import { getPercentChange } from '../scripts/formatter';
import { fetchGraphData, getCurrentPrice, updatePriceChange} from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';




class MainGraph extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('handleSelect');
        this.state = {
            price: null
        }
    }
    componentWillReceiveProps(nextProps) {
    

    }
    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {

          //this.setState({...this.state, selectedEntry: null})
        } else {
          this.setState({ price: JSON.stringify(entry.y)})
        }
    }
    render() {
        
        
        var legend =  {
            enabled: false,
            textColor: processColor('blue'),
            textSize: 12,
            position: 'BELOW_CHART_RIGHT',
            form: 'SQUARE',
            formSize: 14,
            xEntrySpace: 10,
            yEntrySpace: 5,
            formToTextSpace: 5,
            wordWrapEnabled: true,
            maxSizePercent: 0.5,
            custom: {
              colors: [processColor('red')]
            }
        };

        var marker = {
            enabled: true,
            backgroundTint: processColor('teal'),
            markerColor: processColor('#F0C0FF8C'),
            textColor: processColor('white'),
        };

        
        var xline = {
            textColor: processColor(colors.cryptGray),
            textSize: 11,
            gridColor: processColor(colors.primaryDark),
            gridLineWidth: 0,
            axisLineColor: processColor('darkgray'),
            axisLineWidth: 0,
            gridDashedLine: {
              lineLength: 10,
              spaceLength: 10
            },
            avoidFirstLastClipping: true,
            position: 'BOTTOM',
            valueFormatter: this.props.x
        }

        var yLine = {
            textColor: processColor(colors.cryptGray),
            axisLineWidth: 0,
            drawGridLines: false,
            gridLineWidth: 0,
            left: {
              drawGridLines: false,
              textColor: processColor(colors.cryptGray),
            },
            right: {
                enabled: false
            }
        }
        var marker = {
            enabled: false,
            backgroundTint: processColor(colors.transparent),
            markerColor: processColor(colors.transparent),
            textColor: processColor(colors.black),
        };
        var data = {
            dataSets: [
                {
                    values: this.props.y,
                    label: 'Company X',
                    config: {
                        drawGridBackground: false,
                        drawBorders: false,
                        lineWidth: 2,
                        drawCircles: false,
                        highlightColor: processColor(colors.accent),
                        color: processColor(colors.accent),
                        drawFilled: true,
                        fillColor: processColor(colors.accent),
                        fillAlpha: 80,
                        valueTextSize: 1,
                        valueFormatter: "##.000",
                        dashedLine: {
                            lineLength: 0,
                            spaceLength: 0
                        },
                        drawVerticalHighlightIndicator: false,
                        drawHorizontalHighlightIndicator: false,
                    }
                }
            ]
        };
        
        return (
            <View style={styles.root}>
                {
                    this.props.x.length > 0 ? 
                    
                    <LineChart
                        style={styles.chart}
                        data={data}
                        description={{text: ''}}
                        legend={legend}
                        drawGridBackground={false}
                        borderColor={processColor('teal')}
                        drawBorders={false}
                        touchEnabled={true}
                        dragEnabled={true}
                        scaleEnabled={false}
                        scaleXEnabled={false}
                        scaleYEnabled={false}
                        pinchZoom={true}
                        doubleTapToZoomEnabled={true}
                        chartDescription={{text:'_'}}
                        dragDecelerationEnabled={true}
                        dragDecelerationFrictionCoef={0.99}
                        xAxis={xline}
                        yAxis={yLine}
                        keepPositionOnRotation={false}
                        onSelect={this.handleSelect}
                        marker={marker}
                    />
                    :
                    <Bars
                        style={defaults.buffer}
                        size={variables.LOADER_SIZE * 0.5}
                        color={colors.accent}
                    />
                }
                <Text style={styles.price}>${this.state.price}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: mixins.fullHeight.height * .55,
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buffer: {
        alignSelf: 'center',
    },
    price: {
        height: 30,
        ...fonts.bookLarge,
    },
    chart: {
        width: mixins.fullWidth.width * .93,
        height: mixins.fullHeight.height * .5,
    }
});

function mapStateToProps({GraphDetail}) {
    return {
        x: GraphDetail.xData,
        y: GraphDetail.yData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchGraphData: (params) => dispatch(fetchGraphData(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGraph);
