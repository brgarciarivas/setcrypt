export const API_VERSION = 1;

//Production API
const API_ROOT_PROD = 'https://setcrypt-api.herokuapp.com';

//local computer ip
const API_ROOT_DEV = 'http://192.168.10.59:3000';


export const API_ROOT = true ? API_ROOT_DEV : API_ROOT_PROD;
//export const API_ROOT = API_ROOT_DEV

export const API_GRAPH_ROOT = `${API_ROOT}/api/v/${API_VERSION}/graph`;

