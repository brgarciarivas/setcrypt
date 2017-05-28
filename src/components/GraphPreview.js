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
import SmallGraph from './SmallGraph';
import GraphPreviewInfo from './GraphPreviewInfo';

import api from '../scripts/api';
import { getPercentChange } from '../scripts/formatter';
import { fetchGraphData, getCurrentPrice, updatePriceChange} from '../actions/Currency';

import { colors, defaults, fonts, mixins, variables } from '../styles';




export default class GraphPreview extends Base {
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
                <SmallGraph/>
                <GraphPreviewInfo/>
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
        backgroundColor: colors.primaryLight,
        borderRadius: 6,
        ...mixins.createShadow(1),

    },
    
});

function mapStateToProps({currency}) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
       
    };
}

// export default connect(mapStateToProps, mapDispatchToProps)(GraphPreview);
