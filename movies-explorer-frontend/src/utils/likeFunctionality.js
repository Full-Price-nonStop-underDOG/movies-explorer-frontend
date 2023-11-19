import api from './MainApi';
export const handleSaveMovie = (card) => {
  api
    .addLike(card)

    .catch((error) => {
      console.log(error);
    });
};

export const handleDeleteMovie = (id) => {
  api
    .removeLike(id)

    .catch((error) => {
      console.log(error, '401 — токен не передан');
    });
};
