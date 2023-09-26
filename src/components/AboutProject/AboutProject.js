import React from 'react';

function AboutProject() {
    return (
        <section id='section-about-project' className='about-project'>
            <div className='about-project__content'>
                <h2 className='about-project__title'>О проекте</h2>
                <div className='about-project__info'>
                    <div className='about-project__cell'>
                        <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
                        <p className='about-project__text'>
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className='about-project__cell'>
                        <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about-project__text'>
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
                <div className='about-project__duration'>
                    <p className='about-project__duration-text'>1 неделя</p>
                    <p className='about-project__duration-text'>4 недели</p>
                    <p className='about-project__duration-text'>Back-end</p>
                    <p className='about-project__duration-text'>Front-end</p>
                </div>
            </div>
        </section>
    );
};

export default AboutProject;