class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkReply(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}/${url}`, {
            ...options,
            credentials: 'include'
        }).then(this._checkReply)
    }


    getUserData() {
        return this._request(`users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
    }

    updateUserData(data) {
        return this._request(`users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                name: data.name,
            })
        })
    }

    // addNewCard(data) {
    //     return this._request(`cards`, {
    //         method: 'POST',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             name: data.name,
    //             link: data.link
    //         })
    //     })
    // }

    addLikeMovie(idMovie) {
        return this._request(`movies/${idMovie}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    removeLikeMovie(idMovie) {
        return this._request(`movies/${idMovie}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    changeLikeMovieStatus(idMovie, isLiked) {
        if (isLiked) {
            return this.addLikeMovie(idMovie);
        } else {
            return this.removeLikeMovie(idMovie);
        }
    }

    deleteMovie(idMovie) {
        return this._request(`movies/${idMovie}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }
}

const mainApi = new MainApi({
    baseUrl: 'http://localhost:4000',
    // baseUrl: 'https://api.ypmesto.nomoreparties.co',
    headers: {
        authorization: '36c21e13-089d-4ac8-bd26-b85419c729aa',
        'Content-Type': 'application/json'
    }
});

export default mainApi;