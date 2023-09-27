import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const sections = [
  { id: 'section-about-project', text: 'О проекте' },
  { id: 'section-techs', text: 'Технологии' },
  { id: 'section-about-me', text: 'Студент' },
];

function NavTab() {
  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
    });
  };

  return (
    <div className='nav-tab'>
      <ul className='nav-tab__list'>
        {sections.map((section) => (
          <li key={section.id} className='nav-tab__item'>
            <ScrollLink
              to={section.id}
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => scrollToSection(section.id)}
            >
              {section.text}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavTab;