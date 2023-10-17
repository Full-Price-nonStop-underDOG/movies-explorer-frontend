import React from 'react';
import './AboutMe.css';
import studentPhoto from '../../../images/studentPhoto.png';

//import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <h1 className='about-me__title'>Студент</h1>
      <section className='about-me__content'>
        <section className='about-me__info'>
          <h3 className='about-me__name'>Виталий</h3>
          <p className='about-me__job'>Фронтенд-разработчик, 30 лет</p>
          <p className='about-me__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/Full-Price-nonStop-underDOG'
            target='_blank'
            rel='noopener noreferrer'
          >
            Github
          </a>
        </section>
        <img src={studentPhoto} alt='Фотография' className='about-me__photo' />
      </section>
    </section>
  );
};

export default AboutMe;
