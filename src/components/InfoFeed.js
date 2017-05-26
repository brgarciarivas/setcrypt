
import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView

} from 'react-native';
import { connect } from 'react-redux';
import { Bars, Pulse } from 'react-native-loader';
import { Actions } from 'react-native-router-flux';


    // consumer_key: 'GYLeNOpmeDdH08o26k1pCv1Yx',
    // consumer_secret: 'rooOlYxCPMrPDCpXn6HVcUkXGJWzbAKEAN0Ts7CvdXuhflVXdx',
    // access_token_key: ' 966790254-vFOCFF7dj1zQZ7iLBUgCXvZ7vD81Ml41flJk5n0V',
    // access_token_secret: 'ESHWEOeMVWf245sLxpPl8lli97qRdP7qGYVFgqY985kEq'

import Base from './Base';
import CoinSelection from './CoinSelection';
import GraphPreview from './GraphPreview';
import RedditFeedTile from './RedditFeedTile';

import { colors, defaults, fonts, mixins, variables } from '../styles';

class InfoFeed extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
        this.convos = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    }

    renderRow(rowData) {
        return (
            <RedditFeedTile
                {...rowData}
            />
        );
    }
    render() {
        console.log('InfoFeed')
        console.log(this.props)
        return (
            <View style={styles.root}>
               {
                 this.props.feed.length > 0 
                    ?
                        <ListView 
                            contentContainerStyle={styles.container}
                            dataSource={this.convos.cloneWithRows(this.props.feed)}
                            renderRow={this.renderRow}
                        />
                    : 
                        <Bars
                            style={defaults.buffer}
                            size={variables.LOADER_SIZE * 0.5}
                            color={colors.primary}
                        />
               }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        marginTop: '1%',
        height: '54%',
        width: '100%',
        flex: 1,
        ...mixins.column,
        ...mixins.center,
    },
    container: {
        alignItems: 'center',
        marginTop: variables.HEADER_HEIGHT * .3
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

export default connect(mapStateToProps)(InfoFeed);
