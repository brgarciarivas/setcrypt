
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
        this.autoBind('handleSelect');
        this.state = {
              data: {},
              legend: {
                enabled: true,
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
                  colors: [processColor('red'), processColor('blue'), processColor('green')],
                  labels: ['Company X', 'Company Y', 'Company Dashed']
                }
              },
              marker: {
                enabled: true,
                backgroundTint: processColor('teal'),
                  markerColor: processColor('#F0C0FF8C'),
                textColor: processColor('white'),

              }
            };
    }
    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
          this.setState({...this.state, selectedEntry: null})
        } else {
          this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
        }
    }
    componentDidMount(){

        var params = {

            ticker: this.props.ticker,
            currency: this.props.currency,
            market: this.props.market,
    
        }

        this.props.fetchCurrencyData(params)
         this.setState(
              update(this.state, {
                data: {
                  $set: {
                    dataSets: [{
                      values: [{y: 100}, {y: 110}, {y: 105}, {y: 115}],
                      label: 'Company X',
                      config: {
                        lineWidth: 2,
                        drawCircles: false,
                        highlightColor: processColor('red'),
                        color: processColor('red'),
                        drawFilled: true,
                        fillColor: processColor('red'),
                        fillAlpha: 60,
                            valueTextSize: 15,
                        valueFormatter: "##.000",
                        dashedLine: {
                          lineLength: 20,
                          spaceLength: 20
                        }
                      }
                    }],
                  }
                },
                xAxis: {
                  $set: {
                    valueFormatter: ['Q1', 'Q2', 'Q3', 'Q4']
                  }
                }
              })
            );
    }
    render() {
        console.log('GraphDetail')
        console.log(this.props)
        return (
            <View style={styles.root}>

                   <View style={{height:80}}>
                     <Text> selected entry</Text>
                     <Text> {this.state.selectedEntry}</Text>
                   </View>

                   <View style={styles.container}>
                     <LineChart
                       style={styles.chart}
                       data={this.state.data}
                       description={{text: ''}}
                       legend={this.state.legend}
                       marker={this.state.marker}
                       xAxis={this.state.xAxis}
                       drawGridBackground={false}
                       borderColor={processColor('teal')}
                       borderWidth={1}
                       drawBorders={true}

                       touchEnabled={true}
                       dragEnabled={true}
                       scaleEnabled={true}
                       scaleXEnabled={true}
                       scaleYEnabled={true}
                       pinchZoom={true}
                       doubleTapToZoomEnabled={true}

                       dragDecelerationEnabled={true}
                       dragDecelerationFrictionCoef={0.99}

                       keepPositionOnRotation={false}
                       onSelect={this.handleSelect.bind(this)}
                     />
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
        ...mixins.flexStart,
        backgroundColor: colors.lightGray
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
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


