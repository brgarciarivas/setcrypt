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

import { colors, defaults, fonts, mixins, variables } from '../styles';




export default class GraphPreview extends Base {
    constructor(props, context) {
        super(props, context);
    }
   
    render() {
        
       
    
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

function mapStateToProps({currency, GraphDetail}) {
    return {
        data: GraphDetail.graph,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDataGraph: (params) => dispatch(fetchDataGraph(params)),
    };
}

// export default connect(mapStateToProps, mapDispatchToProps)(GraphPreview);
