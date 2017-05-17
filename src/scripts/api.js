import { API_ROOT } from '../constants';

export default {
    get(route) {
        return fetch(API_ROOT + route, {
            method: 'GET',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === 'success' && json.payload) {
                    return json.payload;
                }
            })
            .catch(err => { throw err; });
    },

    post(route, data) {
        return fetch(API_ROOT + route, {
            method: 'POST',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.status === 'success' && json.payload) {
                    return json.payload;
                }
                if(json.error.error) {
                    throw json.error.error.code;
                }
                throw json.error;
            })
            .catch(err => { throw err; });
    },
    graph(query) {
        return fetch(API_ROOT, {
            method: 'POST',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if (json && json.errors) {
                console.log('returning error json')
                throw json.errors[0].message;
            } else if (json && json.data) {
                console.log('returning valid json')
                return json.data;
            } else {
                throw 'network error';
            }
        })
        .catch(err => {
            // Toast.showLongBottom(err);
            console.log('wtf');
            console.log(err);
            throw err;
        });
    },
    getExt(route) {

        return (
            fetch(route, {
                method: 'GET',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => 
                res.json()
                
            )
            .then(res => {
                return res;
            })
            .catch(err => console.error(err))
        )
    },
    postExt(route, postData) {
        console.log(postData)
        return (
            fetch(route, {
                method: 'POST',
                crossDomain: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            .then(res => {
                return res.json();
            })
            .catch(err => console.error(err))
        )
    }
}