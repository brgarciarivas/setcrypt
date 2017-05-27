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
        height: 60,
        marginTop: 16,
        ...mixins.fullWidth,
        ...mixins.column,
        ...mixins.spaceAround,
    },
    container:  {
        ...mixins.fullWidth,
        height: '80%',
        ...mixins.row,
        ...mixins.spaceAround
    },
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