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
import Icon from 'react-native-vector-icons/FontAwesome';


import Base from './Base';

import api from '../scripts/api';
import { getPercentChange } from '../scripts/formatter';
import { fetchGraphData, getCurrentPrice, updatePriceChange} from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';




class GraphPreview extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('calculatePercentChange');
        this.state = {
            priceChange: 0,
        }
    }
    calculatePercentChange() {
       
        var change = getPercentChange(this.props.data)
        
        this.props.updatePriceChange(change)
        return change;
    }
    render() {
        
        let options = {
            width: mixins.fullWidth.width * .8,
            height: mixins.fullHeight.height * .3,
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
                showLines: false,
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
        console.log('check')
        var check = this.props.priceChange
        console.log(typeof check) 
        var priceChange = check > 0;

        console.log('priceChange')
        console.log(priceChange)
        var changeColor = priceChange ? {color: colors.green} : {color: colors.red};

        var changeIcon = priceChange ? 'caret-up' : 'caret-down';

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
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>
                            7 Day Price Growth
                        </Text>
                        <View style={styles.priceChange}>
                            <Text style={[styles.stat, {...changeColor}]}>

                                {
                                    this.props.data.length > 0 ?
                                    this.calculatePercentChange()
                                    :
                                    'N/A'
                                }%
                            </Text>
                            <Icon
                                name={changeIcon}
                                style={[styles.icon, {...changeColor}]}
                            />

                        </View>
                       
                    </View>

                    <View  style={styles.divider}/>

                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>
                            {this.props.ticker}
                        </Text>
                        <Text style={styles.stat}>
                           ${
                                this.props.currentPrice !== null ?
                                this.props.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : 
                                'N/A'
                            }
                        </Text>
                    </View>

                    <View  style={styles.divider}/>
                
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>
                            Market Cap
                        </Text>
                        <Text style={styles.cap}>
                            ${
                                this.props.marketCap !== null ?
                                this.props.marketCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                :
                                'N/A'
                            }
                        </Text>
                    </View>
                    
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: mixins.fullHeight.height * .5,
        width: '95%',
        ...mixins.column,
        ...mixins.center,
        justifyContent: 'space-around',
        backgroundColor: colors.mainBlack,
        borderRadius: 6,

    },
    textContainer: {
        height: '20%',
        width: '100%',
        ...mixins.row,
        ...mixins.center,
        ...fonts.bookMedium,
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
        backgroundColor: colors.blue,
    },
    graphChart: {
        ...mixins.row,
    },
    textInfo: {
        color: colors.blue,
    },
    info:  {
        color: colors.white,
        textAlign: 'center',
        ...fonts.bookMicro,
    },
    icon: {
        ...fonts.bookMedium,
        marginLeft: 6,
    },
    stat:{
        color: colors.white,
        ...fonts.bookMedium
    },
    cap: {
        color: colors.white,
        ...fonts.bookMicro
    },
    priceChange: {
        ...mixins.row,
        ...mixins.center,
    },
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
        getCurrentPrice: (params) => dispatch(getCurrentPrice(params)),
        updatePriceChange: (change) => dispatch(updatePriceChange(change)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphPreview);
