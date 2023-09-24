import React from 'react';
import imageMe from '../../images/IMGme.jpeg'

function AboutMe() {
    return (
        <section id='section-about-me' className='about-me'>
            <div className='about-me__content'>
                <h2 className='about-me__title section__title'>Студент</h2>
                <div className='about-me__container'>
                    <div className='about-me__container-info'>
                        <h2 className='about-me__title-description section__title-description'>Ольга</h2>
                        <h2 className='about-me__subtitle'>Фронтенд-разработчик, 31 год</h2>
                        <p className='about-me__text section__text'>
                            Меня зовут Оля, и я родилась в Якутске, но сейчас живу в Нидерландах.
                            Закончила СибГУТИ в Новосибирске и недавно начала изучать фронтенд-разработку.
                            Я люблю слушать музыку, природу, встречаться с друзьями и путешествовать.
                            После прохождения курса по веб-разработке, хочу устроиться на работу по этой специальности.</p>
                        <a className='about-me__link' href='https://github.com/OlgaKg' target='_blank' rel='noopener noreferrer'>Github</a>
                    </div>
                    <div className='about-me__container-foto'>
                        <img className='about-me__image' src={imageMe} alt='фото со мной' />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
