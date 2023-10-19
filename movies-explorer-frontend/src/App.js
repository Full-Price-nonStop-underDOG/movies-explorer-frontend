import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  redirect,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { windowWidth } from './utils/constans';

import Preloader from './components/Preloader/Preloader';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/Movies/SavedMovies/SavedMovies';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';

import { startMovies } from './utils/startMovies';
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [device, setDevice] = useState('desktop');
  const navigate = useNavigate();

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

  const handleLogin = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
    navigate('/movies', { replace: true });
  };
  const handleRegister = () => {
    navigate('/signin');
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    navigate('/', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Suspense fallback={<Preloader />}>
        <section className='app'>
          <Routes>
            <Route path='/' element={<Main device={device} />} />
            <Route
              path='/movies'
              element={<Movies list={startMovies} device={device} />}
            />
            <Route
              path='/saved-movies'
              element={<SavedMovies list={startMovies} device={device} />}
            />

            <Route
              path='/signin'
              element={
                <Login onLogin={handleLogin} onRegister={handleRegister} />
              }
            />
            <Route
              path='/signup'
              element={
                <Register onLogin={handleLogin} onRegister={handleRegister} />
              }
            />
            <Route
              path='/profile'
              element={<Profile onLogout={handleLogout} device={device} />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </section>
      </Suspense>
    </CurrentUserContext.Provider>
  );
}

export default App;
