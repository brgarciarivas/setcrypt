import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Base from './Base';
import CoinSelection from './CoinSelection';
import GraphPreview from './GraphPreview';
import InfoFeed from './InfoFeed';
import IconButton from './IconButton';

import { colors, defaults, fonts, mixins, variables } from '../styles';

export default class Home extends Base {

    static renderNavigationBar(props) {
        return (
            <View style={defaults.navBar}>
                <IconButton
                    iconName='gear'
                    
                />
                <Text style={defaults.navBarTitle}>{props.title}</Text>
                <IconButton
                    iconName='area-chart'
                    onPress={() => Actions.GraphDetail({ type: 'push' })}
                />
            </View>
        );
    }

    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
    render() {
        return (
            <View style={styles.root}>
               <CoinSelection/>
               <GraphPreview/>
               <InfoFeed/>
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
        alignItems: 'center',
        backgroundColor: colors.lightGray
    },
});

