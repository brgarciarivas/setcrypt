import * as variables from './variables';

const height = variables.SCREEN_HEIGHT;
const width = variables.SCREEN_WIDTH;
const microFontSize = .018;
const microLineHeight = .024;
const tinyFontSize = microFontSize * 1.25;
const tinyLineHeight = microLineHeight * 1.25;
const smallFontSize = tinyFontSize * 1.25;
const smallLineHeight = tinyLineHeight * 1.25;
const mediumFontSize = smallFontSize * 1.25;
const mediumLineHeight = smallLineHeight * 1.25;
const largeFontSize = mediumFontSize * 1.25;
const largeLineHeight = mediumLineHeight * 1.25;

export const bookMicro = {
    fontFamily: 'Avenir-Book',
    fontSize: height * microFontSize,
    lineHeight: Math.round(height * microLineHeight)
};

export const bookTiny = {
    fontFamily: 'Avenir-Book',
    fontSize: height * tinyFontSize,
    lineHeight: Math.round(height * tinyLineHeight)
};

export const bookSmall = {
    fontFamily: 'Avenir-Book',
    fontSize: height * smallFontSize,
    lineHeight: Math.round(height * smallLineHeight)
};

export const bookMedium = {
    fontFamily: 'Avenir-Book',
    fontSize: height * mediumFontSize,
    lineHeight: Math.round(height * mediumLineHeight)
};

export const bookLarge = {
    fontFamily: 'Avenir-Book',
    fontSize: height * largeFontSize,
    lineHeight: Math.round(height * largeLineHeight)
};

export const lightTiny = {
    fontFamily: 'Avenir-Light',
    fontSize: height * tinyFontSize,
    lineHeight: Math.round(height * tinyLineHeight)
};

export const lightSmall = {
    fontFamily: 'Avenir-Light',
    fontSize: height * smallFontSize,
    lineHeight: Math.round(height * smallLineHeight)
};

export const lightMedium = {
    fontFamily: 'Avenir-Light',
    fontSize: height * mediumFontSize,
    lineHeight: Math.round(height * mediumLineHeight)
};

export const lightLarge = {
    fontFamily: 'Avenir-Light',
    fontSize: height * largeFontSize,
    lineHeight: Math.round(height * largeLineHeight)
};