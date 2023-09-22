import React from 'react';

function AboutProject() {
    return (
        <section id='sectionAboutProject' className='aboutProject'>
            <h2 className='aboutProject__title section__title'>О проекте</h2>
            <div className='aboutProject__info'>
                <div className='aboutProject__cell'>
                    <h3 className='aboutProject__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='aboutProject__text section__text'>
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className='aboutProject__cell'>
                    <h3 className='aboutProject__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='aboutProject__text section__text'>
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className='aboutProject__duration'>
                <p className='aboutProject__duration-text section__text'>1 неделя</p>
                <p className='aboutProject__duration-text section__text'>4 недели</p>
                <p className='aboutProject__duration-text section__text'>Back-end</p>
                <p className='aboutProject__duration-text section__text'>Front-end</p>
            </div>
        </section>
    );
};

export default AboutProject;