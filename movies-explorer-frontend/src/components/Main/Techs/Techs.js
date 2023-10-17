import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <h1 className='techs__title'>Технологии</h1>
      <article className='techs__content'>
        <h4 className='techs__article-title'>7 технологий</h4>
        <p className='techs__article-caption'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__tech-list'>
          <li className='techs__tech-element'>HTML</li>
          <li className='techs__tech-element'>CSS</li>
          <li className='techs__tech-element'>JS</li>
          <li className='techs__tech-element'>React</li>
          <li className='techs__tech-element'>Git</li>
          <li className='techs__tech-element'>Express.js</li>
          <li className='techs__tech-element'>mongoDB</li>
        </ul>
      </article>
    </section>
  );
};

export default Techs;
