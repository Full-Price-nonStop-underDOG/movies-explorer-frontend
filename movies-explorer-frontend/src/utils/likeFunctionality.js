import api from './MainApi';
export const handleSaveMovie = (id) => {
  api
    .addLike(id)

    .catch((error) => {
      console.log(error, '401 — токен не передан');
    });
};

export const handleDeleteMovie = (id) => {
  api
    .removeLike(id)

    .catch((error) => {
      console.log(error, '401 — токен не передан');
    });
};
