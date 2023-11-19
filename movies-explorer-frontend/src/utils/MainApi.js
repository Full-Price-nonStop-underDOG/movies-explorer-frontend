import { elemenetsApi } from './constans';
class MainApi {
  constructor({ headers, URL }) {
    this._headers = headers;
    this._url = URL;
  }
  _handlePromiseRequest(res) {
    if (res.ok) {
      return res.json();
    } else throw new Error('ошибка');
  }

  async addLike(card) {
    console.log('add like', card);
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PUT',
      headers: { ...this._headers },
      credentials: 'include',
      body: JSON.stringify({
        card: card,
      }),
    });
    return this._handlePromiseRequest(response);
  }

  async removeLike(card) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'DELETE',
      headers: { ...this._headers },
      credentials: 'include',
      body: JSON.stringify({
        card: card,
      }),
    });

    return this._handlePromiseRequest(response);
  }

  async getUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { ...this._headers },
      credentials: 'include',
    });
    return this._handlePromiseRequest(response);
  }

  async editProfileInfo(data) {
    console.log(data);
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });

    return this._handlePromiseRequest(response);
  }

  async removeMovie(movieId, token) {
    try {
      const response = await fetch(`${this._url}/Movies/${movieId}`, {
        method: 'DELETE',
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Попробуйте распарсить JSON с информацией об ошибке
        throw new Error(errorData.message || 'Ошибка при удалении карточки');
      }

      return this._handlePromiseRequest(response);
    } catch (error) {
      throw error;
    }
  }

  async addNewCard(data, token) {
    const response = await fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._handlePromiseRequest(response);
  }
}

const api = new MainApi(elemenetsApi);
export default api;
