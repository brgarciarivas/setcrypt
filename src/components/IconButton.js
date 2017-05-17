import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Base from './Base';

import { colors, defaults, fonts, mixins, variables } from '../styles';

export default IconButton = (props) => (
    <TouchableOpacity
        style={props.containerStyle ? props.containerStyle : defaults.navBarIconContainer}
        onPress={props.onPress}
    >
        <Icon
            name={props.iconName}
            size={variables.ICON_SIZE}
            style={props.iconStyle ? props.iconStyle : defaults.navBarIcon}
        />
    </TouchableOpacity>
);