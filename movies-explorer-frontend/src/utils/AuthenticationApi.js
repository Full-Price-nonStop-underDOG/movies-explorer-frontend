import { elemenetsApi } from './constans';
class Api {
  constructor({ headers, URL }) {
    this._headers = headers;
    this._url = URL;
  }

  _handlePromiseRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        const error = new Error(
          `Request failed with status ${res.status}: ${
            data.message || res.statusText
          }`
        );
        error.response = res; // Attach the response to the error object for additional information
        throw error;
      });
    }
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

  async checkToken() {
    //const token = this.getToken(); // Получаем токен из localStorage
    try {
      const response = await fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          ...this._headers,
          credentials: 'include',
          // Передаем токен в заголовке запроса
        },
      });
      const data = await this._handlePromiseRequest(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  async signout() {
    try {
      const response = await fetch(`${this._url}/signout`, {
        method: 'POST', // или другой метод, который вы используете на сервере
        headers: this._headers,
        credentials: 'include', // Включите передачу кук в запросе
      });

      if (response.ok) {
        // Очистите куку на клиенте (если вы храните токен в куке)
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Верните успешный результат выхода
        return { message: 'Signout successful' };
      } else {
        // Если сервер вернул ошибку, обработайте ее здесь
        throw new Error('ошибка');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

const authenticationApi = new Api(elemenetsApi);
export default authenticationApi;
