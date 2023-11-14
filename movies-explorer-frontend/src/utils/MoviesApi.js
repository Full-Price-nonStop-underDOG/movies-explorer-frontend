import { moviesApi } from './constans';
class BeatMoviesApi {
  constructor({ headers, URL }) {
    this._headers = headers;
    this._url = URL;
  }

  _handlePromiseRequest(res) {
    if (res.ok) {
      return res.json();
    } else throw new Error('ошибка');
  }

  async makeGetRequest() {
    const response = await fetch(`${this._url}`, {
      method: 'GET',
      headers: { ...this._headers },
    });

    return this._handlePromiseRequest(response);
  }
  async getMovieById(id) {
    const response = await fetch(`${this._url}/${id}`, {
      method: 'GET',
      headers: { ...this._headers },
    });

    return this._handlePromiseRequest(response);
  }
}

const MoviesApi = new BeatMoviesApi(moviesApi);
export default MoviesApi;
