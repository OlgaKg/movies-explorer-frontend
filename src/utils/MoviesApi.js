export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

const makeRequest = (url, options) => {
  return fetch(BASE_URL, options)
    .then(checkResponse);
};

export const getMovies = () => {
  return makeRequest('', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};