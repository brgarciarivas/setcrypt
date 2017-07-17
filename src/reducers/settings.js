import * as types from '../constants/actionTypes';

const initialState = {
    currency: 'USD',
    ticker: 'ETH',
    landCugrrency: [
        'USD', 'EUR', 'MXN', 'JPY', 'AUD', 'CAD', 'KRW'
    ],
    cryptCurrency: [
        // {
        //     ticker: 'BTC',
        //     name: 'Bitcoin',
        //     market: 'Coinbase',
        //     pic: 'https://jackpotfaucet.com/bitcoin.png',
        // },
        {
            ticker: 'ETH',
            name: 'Ethereum',
            market: 'Coinbase',

        },
        {
            ticker: 'XRP',
            name: 'Ripple',
            market: 'Bitstamp',
        },
        {
            ticker: 'DASH',
            name: 'Dash',
            market: 'Kraken',
        },
        {
            ticker: 'LTC',
            name: 'Litecoin',
            market: 'Kraken',
        },
        {
            ticker: 'XMR',
            name: 'Monero',
            market: 'Poloniex',
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