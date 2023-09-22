import React from 'react';

function Techs() {
    return (
        <section id='sectionTechs' className='techs'>
            <h2 className='techs__title section__title'>Технологии</h2>
            <h2 className='techs__title-description section__title-description'>7 технологий</h2>
            <p className='techs__text section__text'>
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='techs__list'>
                <p className='techs__list_item section__text'>HTML</p>
                <p className='techs__list_item section__text'>CSS</p>
                <p className='techs__list_item section__text'>JS</p>
                <p className='techs__list_item section__text'>React</p>
                <p className='techs__list_item section__text'>Git</p>
                <p className='techs__list_item section__text'>Express.js</p>
                <p className='techs__list_item section__text'>mongoDB</p>
            </div>
        </section>
    );
};

export default Techs;