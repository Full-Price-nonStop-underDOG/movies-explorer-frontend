import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ list, device }) {
  return (
    <>
      <Header device={device} />
      <section className='movies'>
        <SearchForm />
        <MoviesCardList list={list} />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
