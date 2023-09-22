import React from 'react';
import imageMe from '../../images/IMGme.jpeg'

function AboutMe() {
    return (
        <section id='sectionAboutMe' className='aboutMe'>
            <h2 className='aboutMe__title section__title'>Студент</h2>
            <div className='aboutMe__container'>
                <div className='aboutMe__container-info'>
                    <h2 className='aboutMe__title-description section__title-description'>Ольга</h2>
                    <h2 className='aboutMe__subtitle'>Фронтенд-разработчик, 31 год</h2>
                    <p className='aboutMe__text section__text'>
                        Меня зовут Оля, и я родилась в Якутске, но сейчас живу в Нидерландах.
                        Закончила СибГУТИ в Новосибирске и недавно начала изучать фронтенд-разработку.
                        Я люблю слушать музыку, природу, встречаться с друзьями и путешествовать.
                        После прохождения курса по веб-разработке, хочу устроиться на работу по этой специальности.</p>
                    <a className='aboutMe__link' href='https://github.com/OlgaKg' target='_blank' rel='noopener noreferrer'>Github</a>
                </div>
                <div className='aboutMe__container-foto'>
                    <img className='aboutMe__image' src={imageMe} alt='фото со мной' />
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
