import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Route,
  Router,
  Routes,
  redirect,
  useNavigate,
  useLoaderData,
} from 'react-router-dom';
import './App.css';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { windowWidth } from './utils/constans';
import { useUserData } from './hooks/useUserData';

import Preloader from './components/Preloader/Preloader';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/Movies/SavedMovies/SavedMovies';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import api from './utils/MainApi';
import MoviesApi from './utils/MoviesApi';
import ProtectedRouteElement from './utils/ProtectedRoute';

function App() {
  const [savedMovies, setSavedFilms] = useState([]);
  const [device, setDevice] = useState('desktop');

  const { currentUserData, setCurrentUserData, isLoggedIn } = useUserData();

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > windowWidth.tablet) {
        setDevice('desktop');
      } else if (window.innerWidth > windowWidth.mobile) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };
    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, [device]);

  const handleSearchForMovies = (keyword) => {
    return MoviesApi.makeGetRequest().then((data) => {
      const filteredMovies = data.reduce((filteredArray, movie) => {
        const nameRuIncludesKeyword = movie.nameRU
          .toLowerCase()
          .includes(keyword.toLowerCase());
        const nameEnIncludesKeyword = movie.nameEN
          .toLowerCase()
          .includes(keyword.toLowerCase());
        if (nameRuIncludesKeyword || nameEnIncludesKeyword) {
          return filteredArray.concat(movie);
        }
        return filteredArray;
      }, []);

      return filteredMovies;
    });
  };

  function handleUpdateUser(userData) {
    api
      .editProfileInfo(userData)

      .then((updatedUser) => {
        const { name, email } = updatedUser; // Извлекаем name и email из ответа сервера
        setCurrentUserData({ name, email }); // Обновляем currentUserData
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleForSavedMovies = async () => {
    const user = await api.getUserInfo();
    const savedMovies = user.savedMovies;

    const savedMoviesList = savedMovies.map((movieId) => {
      return MoviesApi.getMovieById(movieId);
    });

    const listOfMovies = await Promise.all(savedMoviesList);

    return listOfMovies;
  };

  const browserRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Main device={device} />} />
        <Route
          path='/movies'
          element={
            <ProtectedRouteElement
              element={Movies}
              device={device}
              handleSearchForMovies={handleSearchForMovies}
            />
          }
        />
        <Route
          path='/saved-movies'
          loader={handleForSavedMovies}
          element={
            <ProtectedRouteElement
              element={SavedMovies}
              list={savedMovies}
              device={device}
            />
          }
        />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route
          path='/profile'
          element={
            <ProtectedRouteElement
              element={Profile}
              device={device}
              handleUpdateUser={handleUpdateUser}
            />
          }
        />
        <Route path='*' element={<NotFound />} />
      </>
    )
  );

  return (
    <CurrentUserProvider value={currentUserData}>
      <Suspense fallback={<Preloader />}>
        <RouterProvider router={browserRoutes} />
      </Suspense>
    </CurrentUserProvider>
  );
}

export default App;
