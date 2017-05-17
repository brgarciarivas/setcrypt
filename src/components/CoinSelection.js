import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView

} from 'react-native';
import { connect } from 'react-redux';


import Base from './Base';
import CoinTile from './CoinTile';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class CoinSelection extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind('renderRow');
        
    }

    renderRow() {
        
        return this.props.allCoins.map((tile, index) => {
            return (
                <CoinTile 
                    {...tile} 
                    key={index}
                />
            )
        });
    };

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.title}>Your Cards</Text>
                <ScrollView 
                    style={styles.container}
                    horizontal={true}
                >
                    { this.renderRow()}
                </ScrollView>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.fullWidth,
        height: 90,
        ...mixins.column,
        ...mixins.spaceAround
    },
    // container:  {
    //     ...mixins.fullWidth,
    //     height: '80%',
    //     ...mixins.row,
    //     ...mixins.spaceAround
    // },
    title: {
        alignSelf: 'flex-start',
        height: '20%',
        marginLeft: '2%',
        color: colors.gray,
        ...fonts.bookTiny,
    }
});

function mapStateToProps({ settings }) {
    return {
        allCoins: settings.cryptCurrency
    };
}

// function mapDispatchToProps(dispatch) {
//     return {
       
//     };
// }

export default connect(mapStateToProps)(CoinSelection);