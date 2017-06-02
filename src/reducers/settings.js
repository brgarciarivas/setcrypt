import * as types from '../constants/actionTypes';

const initialState = {
    currency: 'USD',
    ticker: 'BTC',
    landCugrrency: [
        'USD', 'EUR', 'MXN', 'JPY', 'AUD', 'CAD', 'KRW'
    ],
    cryptCurrency: [
        {
            ticker: 'BTC',
            name: 'Bitcoin',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/bitcoin.png',
            market: 'Coinbase',
            pic: 'https://jackpotfaucet.com/bitcoin.png',
        },
        {
            ticker: 'ETH',
            name: 'Ethereum',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/ethereum.png',
            market: 'Coinbase',
            pic: 'https://i.redditmedia.com/W9sTWz4pLd1u2_alQcNqBNYrfLJWahw6yg1fwPsdfbI.jpg?s=c78d76be35ad6017ae6dcb389382fbcc',

        },
        {
            ticker: 'XRP',
            name: 'Ripple',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/ripple.png',
            market: 'Bitstamp',
            pic: 'https://ripple.com/wp-content/uploads/2014/10/mark.png',
        },
        {
            ticker: 'DASH',
            name: 'Dash',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/dash.png',
            market: 'Kraken',
            pic: 'https://bitcoinist.com/wp-content/uploads/2016/01/Dash-logo-300x300.png',
        },
        {
            ticker: 'LTC',
            name: 'Litecoin',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/litecoin.png',
            market: 'Kraken',
            pic: 'https://litecoin.info/images/0/08/Litecoin-ren1.png',
        },
        {
            ticker: 'XMR',
            name: 'Monero',
            url: 'https://coinmarketcap.com/static/img/coins/16x16/monero.png',
            market: 'Poloniex',
            pic: 'https://i.redditmedia.com/SgYfFN_FncaqzYppfxB7JoabXlTC95N2coRyJ9IhnLA.jpg?s=8509e3deb8a9b3c4d2cea9ac6ab59746',
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