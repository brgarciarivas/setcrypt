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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Base from './Base';
import IconButton from './IconButton'

import { colors, defaults, fonts, mixins, variables } from '../styles';

class RedditFeedTile extends Base {
    constructor(props, context) {
        super(props, context);
        this.autoBind();
    }

   
    render() {
      
        const {
            author,
            permalink,
            score,
            subreddit_name_prefixed,
            title,
            url,
            preview,
            selftext
        } = this.props.data;

       
        var image = preview == undefined ?  this.props.lgPic : preview.images[0].source.url
        return (
            <TouchableHighlight 
                style={styles.root} 
                onPress={ () => Actions.ViewWeb({type: 'push', url: url})}
            >
                <View style={styles.container}>
                   <Image 
                        source={{ uri: image }}
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text 
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        
                    </View>
                    <View style={styles.infoContainer}>
                        <Text 
                            style={[styles.infoText, { color: colors.black}, { ...fonts.bookMicro}]}
                            numberOfLines={1}
                        >/{author}</Text>
                        <View style={styles.upvote}>
                            <IconButton 
                                iconName='arrow-up'
                                containerStyle={styles.iconContainer}
                                iconStyle={styles.icon}
                            />
                            <Text 
                                style={styles.infoText}
                                numberOfLines={1}
                            >
                                {score}
                            </Text>
                        </View>
                        
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
        ...mixins.createShadow(2),
        backgroundColor: colors.primaryLight,
        height: variables.primaryLight,
        width: variables.SCREEN_WIDTH * .95,
        borderRadius: 6,
        marginBottom: 10,
        alignItems: 'center',

       
    },
    container: {
        ...mixins.row,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: variables.MIN_TILE_HEIGHT,
        width: '100%',
        justifyContent: 'space-around',
    },
    image: {
        // width: variables.SCREEN_WIDTH * .3,
        // height: variables.MIN_TILE_HEIGHT ,
        marginLeft: '2%',
        borderRadius: variables.SCREEN_WIDTH * .05,
        width: variables.SCREEN_WIDTH * .1,
        height: variables.SCREEN_WIDTH * .1,
    },
    textContainer: {
        paddingLeft: 8,
        flex: 2,
        height: '80%',
        ...mixins.column,
        ...mixins.center,
    },
    title: {
        ...fonts.bookMicro,
        fontWeight: 'bold',
        color: colors.black,
    },
    infoContainer: {
        flex: 1,
        ...mixins.column,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...mixins.center,
        height: '80%',
    },
    infoText: {
        ...fonts.bookTiny,
        color: colors.black,
    },
    iconContainer: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        backgroundColor: colors.green,
        ...mixins.column,
        ...mixins.center,
        marginRight: 5,
    },
    icon: {
        color: colors.white,
        fontSize: 12,
    },
    upvote: {
        marginTop: 4,
        ...mixins.row,
        ...mixins.center,
    },
});

function mapStateToProps({currency}) {
    return { 
        lgPic: currency.lgPic,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps)(RedditFeedTile);
