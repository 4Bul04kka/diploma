import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { footer_logo } from "../../img/Img_exports"; // Импортируем логотип

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Левая колонка — логотип и копирайт */}
        <div className='footer-logo-section'>
          <img src={footer_logo} alt='Логотип' className='footer-logo' />
          <p className='footer-copy'>
            &copy; {new Date().getFullYear()} Shortcut. Все права защищены.
          </p>
        </div>

        {/* Центральная колонка — ссылки */}
        <div className='footer-links-section'>
          <h4 className='footer-title'>Навигация</h4>
          <ul className='footer-links'>
            <li>
              <Link to='/services'>Услуги</Link>
            </li>
            <li>
              <Link to='/partners'>Наши партнёры</Link>
            </li>
            <li>
              <Link to='/about'>О платформе</Link>
            </li>
            {/* <li>
              <Link to='/communication'>Контакты</Link>
            </li>
            <li>
              <Link to='/events'>Новости</Link>
            </li> */}
          </ul>
        </div>

        {/* Правая колонка — контакты */}
        <div className='footer-contact-section'>
          <h4 className='footer-title'>Контакты</h4>
          <p>Телефон: +7 (999) 123-45-67</p>
          <p>Email: info@shortcut.ru</p>
          <p>Адрес: г. Москва, ул. Примерная, 10</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
