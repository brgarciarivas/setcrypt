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

export default class InboxPage extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }
    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.text}>List of Conversations</Text>
                <Icon name='comments-o' size={30} color={colors.primaryLight} />
                <Text style={styles.text}>In Development...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        height: variables.HEADER_HEIGHT,
        ...mixins.fullHeight,
        ...mixins.row,
        ...mixins.spaceAround,
        backgroundColor: colors.lightGray
    },
    text: {
        ...fonts.bookSmall
    }
});

