import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Base from './Base';

import { fetchGraphDataSet, toggleTimeSelection } from '../actions/GraphDetail';

//import { fetchCurrencyData } from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class TimeSelectionTile extends Base {
    
    constructor(props, context) {
        super(props, context);
        this.autoBind('handleClick');
    }
    
    handleClick(){
        //console.log('handleClick + ' + this.props.time)
        var params = {
            ticker: this.props.ticker,
            time: this.props.time,
        }
        console.log(params)
        this.props.toggleTimeSelection(params.time)
        this.props.fetchGraphDataSet(params)
    }
    render() {
        
        var barColor = this.props.time == this.props.selectedTime ? { backgroundColor: colors.teal } : { backgroundColor: colors.transparent };
        var textColor = this.props.time == this.props.selectedTime ? { color: colors.accent } : { color: colors.mainGray }
        return (
            <TouchableOpacity
                onPress={() => this.handleClick()}
            >
                <View style={styles.container}>
                    <Text style={[styles.text, textColor]}>{this.props.text}</Text>
                    <View style={[styles.bar, barColor]}/>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        
    },
    bar: {
        marginTop: 8,
        width: 40,
        height: 4,
        
    }
});


function mapStateToProps({currency, GraphDetail}) {
    return {
        ticker: currency.ticker,
        name: currency.name,
        selectedTime: GraphDetail.time,
    };
}

function mapDispatchToProps(dispatch) {
    return {
       fetchGraphDataSet: (params) => dispatch(fetchGraphDataSet(params)),
       toggleTimeSelection: (time) => dispatch(
        toggleTimeSelection(time)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelectionTile);


