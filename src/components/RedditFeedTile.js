import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
} from 'react-native';
import { connect } from 'react-redux';

import Base from './Base';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class RedditFeedTile extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }

   
    render() {
        console.log('RedditFeedTile');
        console.log(this.props);
        return (
            <TouchableHighlight 
                style={styles.root} 
                onPress={this.props.onPress}
            >
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.topText}>Top left</Text>
                        <Text style={styles.topText}>Top Right</Text>
                    </View>
                    <View style={styles.middle}>
                        <Text style={styles.pic}>pic</Text>
                        <Text style={styles.info}>bio of whaterver this is</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>Bottom</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        ...mixins.row,
        ...mixins.center,
        ...mixins.createShadow(1),
        backgroundColor: colors.white,
        height: variables.MIN_TILE_HEIGHT,
        width: variables.SCREEN_WIDTH * .95,
        borderRadius: 8,
        marginBottom: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray
       
    },
    container: {
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: variables.MIN_TILE_HEIGHT,
        width: '80%',
        justifyContent: 'space-around',
    },
    image: {
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: variables.SCREEN_WIDTH * .06,
        width: variables.SCREEN_WIDTH * .12,
        height: variables.SCREEN_WIDTH * .12,
    },
});

function mapStateToProps({currency}) {
    return {
        feed: currency.reddit,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps)(RedditFeedTile);
