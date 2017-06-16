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

import Base from './Base';
import TimeSelectionTile from './TimeSelectionTile';

import { fetchGraphDataSet } from '../actions/GraphDetail';

//import { fetchCurrencyData } from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class TimeSelection extends Base {
    
    constructor(props, context) {
        super(props, context);
        this.autoBind('loadDates');
    }

    loadDates() {
        var times = [
            {
                text: '1D',
                time: 'Day',
            },
            {
                text: '1W',
                time: 'Week',
            },
            {
                text: '1M',
                time: 'Month',
            },
            {
                text: '1Y',
                time: 'Year'
            }
        ];

        return times.map((t, i) => {
            console.log('lit')
            console.log(t)
            return (
                <TimeSelectionTile
                    {...t}
                    key={i}
                />
            );
        })
    }

    render() {
        console.log('GraphDetail')
        console.log(this.props)
        return (
            <View style={styles.root}>
                {this.loadDates()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        marginTop: 14,
        ...mixins.row,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: mixins.fullWidth.width * .93, 
    },
});


function mapStateToProps({currency, GraphDetail}) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
       fetchGraphDataSet: (params) => dispatch(fetchGraphDataSet(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelection);


