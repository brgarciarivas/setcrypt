    import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    WebView
} from 'react-native';
import { defaults, mixins, colors, variables } from '../styles';

export default ViewWeb = (props) => (
    <WebView
        source={{ uri: props.url }}
        style={styles.root}
    />
);

const styles = StyleSheet.create({
    root: {
        ...defaults.overlay,
        ...mixins.column,
        ...mixins.center,
        backgroundColor: colors.green,
        //marginTop: variables.HEADER_HEIGHT
    }
});