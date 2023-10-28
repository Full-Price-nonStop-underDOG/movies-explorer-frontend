import { elemenetsApi } from './constans';
class Api {
  constructor({ headers, URL }) {
    this._headers = headers;
    this._url = URL;
  }

  _handlePromiseRequest(res) {
    if (res.ok) {
      return res.json();
    } else throw new Error('ошибка');
  }

  async register(email, password, forename) {
    try {
      const response = await fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,

        body: JSON.stringify({
          name: forename,
          email: email,
          password: password,
        }),
      });
      const data = await this._handlePromiseRequest(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
      });

      const data = await this._handlePromiseRequest(response);
      if (data) {
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  async checkToken(token) {
    //const token = this.getToken(); // Получаем токен из localStorage
    try {
      const response = await fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке запроса
        },
      });
      const data = await this._handlePromiseRequest(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const authenticationApi = new Api(elemenetsApi);
export default authenticationApi;
