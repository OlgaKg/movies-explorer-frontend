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

    getSavedMovies() {
		return this._request(`movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
	};

    saveMovie(info) {
        return this._request('movies', {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            country: info.country,
            director: info.director,
            duration: info.duration,
            year: info.year,
            description: info.description,
            image: 'https://api.nomoreparties.co' + info.image.url,
            trailerLink: info.trailerLink,
            thumbnail: 'https://api.nomoreparties.co' +  info.image.formats.thumbnail.url,
            movieId: info.id,
            nameRU: info.nameRU,
            nameEN: info.nameEN,
        }),
        });
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
        'Content-Type': 'application/json'
    }
});

export default mainApi;