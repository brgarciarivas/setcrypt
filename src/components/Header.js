import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Base from './Base';

import { colors, defaults, fonts, mixins, variables } from '../styles';

export default class Header extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
    render() {
        return (
            <View style={styles.root}>
                <Icon name='cog' size={30} color={colors.teal} />
                <Text style={styles.text}>Setkrypt</Text>
                <Icon name='line-chart' size={30} color={colors.teal} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.fullWidth,
        ...mixins.fullHeight,
        ...mixins.column,
        ...mixins.center,
        backgroundColor: colors.lightGray
    },
    text: {
        ...fonts.bookSmall
    }
});

