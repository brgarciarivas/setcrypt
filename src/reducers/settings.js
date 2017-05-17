import * as types from '../constants/actionTypes';

const initialState = {
    currency: 'USD',
    ticker: 'BTC',
    landCurrency: [
        'USD', 'EUR', 'MXN', 'JPY', 'AUD', 'CAD', 'KRW'
    ],
    cryptCurrency: [
        {
            ticker: 'BTC',
            name: 'Bitcoin',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/bitcoin.png',
            market: 'Coinbase',
        },
        {
            ticker: 'ETH',
            name: 'Ethereum',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/ethereum.png',
            market: 'Coinbase',
        },
        {
            ticker: 'XRP',
            name: 'Ripple',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/ripple.png',
            market: 'Bitstamp',
        },
        {
            ticker: 'DASH',
            name: 'Dash',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/dash.png',
            market: 'Kraken',
        },
        {
            ticker: 'LTC',
            name: 'Litecoin',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/litecoin.png',
            market: 'Kraken'
        },
        {
            ticker: 'XMR',
            name: 'Monero',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/monero.png',
            market: 'Poloniex'
        }
    ]
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.HANDLE_CURRENCY:
            return {
                ...state,
                crypt: action.currency,
            };
        default:return state;
    }
}