import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Base from './Base';



import { colors, defaults, fonts, mixins, variables } from '../styles';

class Splash extends Base {
    static renderNavigationBar(props) {
        return (
            <View style={defaults.navBar}>
                <IconButton
                    iconName='gear'
                    iconStyle={defaults.navNoIcon}
                />
                <Text style={defaults.navBarTitle}>{props.title}</Text>
                <IconButton
                    iconName='gear'
                    iconStyle={defaults.navBarIcon}
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
                <Text>Splash</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...defaults.page,
        ...mixins.column,
        ...mixins.center,
        backgroundColor: colors.lightGray,
        paddingBottom: variables.SPACING_HEIGHT,
    },
   
});

function mapStateToProps({ auth, products, shoppingLists, environment, curation, }) {
    return {
    
    };
}

function mapDispatchToProps(dispatch) {
    return {
       
    };
}

export default connect()(Splash);