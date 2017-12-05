import querystring from 'querystring';

const API_BASE_URL = 'https://www.googleapis.com/books/v1';

const GoogleBooksAPI = {
    find(id) {
        return this._sendRequest(`/volumes/${id}`, {
            lang: 'en',
        });
    },

    search(query, limit) {
        return this._sendRequest('/volumes', {
            q: query,
            limit,
            lang: 'en',
        });
    },

    _sendRequest(path, params) {
        var url = API_BASE_URL + path;
        
        if (params) {
            url += '?' + querystring.stringify(params);
        }

        return fetch(url).then(response => (
            response.json()
        ));
    }
}

export default GoogleBooksAPI;
