import React from "react";
import "./about.css";
import { FaHandshake, FaChartLine, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div className='about-page'>
      <header className='about-hero'>
        <h1>О платформе Shortcut</h1>
        <p>
          Современное решение для поиска лучших финансовых предложений для
          бизнеса
        </p>
      </header>

      <section className='about-section'>
        <h2>Наша миссия</h2>
        <p>
          Shortcut — это технологичная платформа, которая помогает
          предпринимателям и компаниям находить наилучшие банковские условия,
          минуя долгие переговоры и поиски. Мы делаем банки инициаторами, а не
          объектами поиска.
        </p>
      </section>

      <section className='about-section features'>
        <h2>Что делает нас особенными?</h2>
        <div className='feature-cards'>
          <div className='feature-card'>
            <FaHandshake className='feature-icon' />
            <h3>Прямое взаимодействие</h3>
            <p>
              Банки сами выходят на связь с предложениями, подобранными под ваш
              профиль.
            </p>
          </div>
          <div className='feature-card'>
            <FaChartLine className='feature-icon' />
            <h3>Прозрачная аналитика</h3>
            <p>
              Вы видите сравнение условий в реальном времени и принимаете
              обоснованные решения.
            </p>
          </div>
          <div className='feature-card'>
            <FaShieldAlt className='feature-icon' />
            <h3>Конфиденциальность</h3>
            <p>Ваши данные защищены и не передаются без вашего согласия.</p>
          </div>
        </div>
      </section>

      <section className='about-section'>
        <h2>Кому подойдет платформа?</h2>
        <ul className='about-list'>
          <li>Малому и среднему бизнесу</li>
          <li>Стартапам, ищущим финансирование</li>
          <li>Корпорациям, желающим оптимизировать кредитные условия</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
