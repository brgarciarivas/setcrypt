
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Base from './Base';


//import { fetchCurrencyData } from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class GraphDetailInfo extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
   
    render() {
        console.log('GraphDetailInfo')
        console.log(this.props)
        const {
            highLow,
            volume,
            weightedAverage,
            time
        } = this.props
        return (
            <View style={styles.root}>
                <View style={styles.con}>
                    <Text style={styles.value}>{highLow.high}</Text>
                    <Text style={styles.title}>{time} High</Text>
                </View>
                <View style={styles.con}>
                    <Text style={styles.value}>{highLow.low}</Text>
                    <Text style={styles.title}>{time} Low</Text>
                </View>
                <View style={styles.con}>
                    <Text style={styles.value}>{volume}</Text>
                    <Text style={styles.title}>Volume</Text>
                </View>
                <View style={styles.con}>
                    <Text style={styles.value}>{weightedAverage}</Text>
                    <Text style={styles.title}>Weighted Average</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        marginTop: 20,
        ...mixins.row,
        ...mixins.center,
    },
    con: {
        flex: 1,
        ...mixins.column,
        ...mixins.center,
    },
    value: {
       ...fonts.bookSmall, 
    },
    title: {
        textAlign: 'center',
        color: colors.accent,
    },
});


function mapStateToProps({ GraphDetail}) {
    return {
        time: GraphDetail.time,
        highLow: GraphDetail.highLow,
        volume: GraphDetail.volume,
        weightedAverage: GraphDetail.weightedAverage
    };
}

function mapDispatchToProps(dispatch) {
    return {
       fetchGraphDataSet: (params) => dispatch(fetchGraphDataSet(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphDetailInfo);


