import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about' id='about'>
      <section className='about__content'>
        <h1 className='about__title'>О проекте</h1>
        <ul className='about__info-list'>
          <li className='about__info-elements'>
            <h2 className='about__info-heading'>
              Дипломный проект включал 5 этапов
            </h2>
            <p className='about__info-text'>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className='about__info-elements'>
            <h2 className='about__info-heading'>
              На выполнение диплома ушло 5 недель
            </h2>
            <p className='about__info-text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <section className='about__duration'>
          <h3 className='about__duration-heading about__duration-heading_green'>
            1 неделя
          </h3>
          <h3 className='about__duration-heading'>4 недели</h3>
          <p className='about__duration-title'>Back-end</p>
          <p className='about__duration-title'>Front-end</p>
        </section>
      </section>
    </section>
  );
};

export default AboutProject;
