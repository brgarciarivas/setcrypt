import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Base from './Base';
import CoinSelection from './CoinSelection';
import GraphPreview from './GraphPreview';
import InfoFeed from './InfoFeed';
import IconButton from './IconButton';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class Home extends Base {

    static renderNavigationBar(props) {
        return (
            <View style={defaults.navBar}>
                <IconButton
                    iconName='gear'
                    color={colors.mainBlack}
                />
                <Text style={defaults.navBarTitle}>{props.title}</Text>
                <IconButton
                    iconName='area-chart'
                    color={colors.mainBlack}
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
                <ScrollView
                    contentContainerStyle={styles.container}
                >
                    <CoinSelection/>
                    <Text style={styles.title}>
                        7 Day Historical Graph
                    </Text>
                    <GraphPreview/>
                    <Text style={styles.title}>
                        R/{this.props.name} Reddit Feed
                    </Text>
                    <InfoFeed/>
                </ScrollView>
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
        backgroundColor: colors.purple,
    },
    container:{
         ...mixins.fullWidth,
        alignItems: 'center',
        ...mixins.column,
        ...mixins.flexStart,
    },
    title: {
        color: colors.white,
        ...fonts.bookSmall,
        marginTop: 10,
        marginBottom: 10,
    }
});


function mapStateToProps({currency}) {
    return {
        
        name: currency.name,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
