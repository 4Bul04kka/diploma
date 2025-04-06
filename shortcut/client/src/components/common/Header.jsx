import React from "react";
import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      {/* Логотип */}
      <div className='header-logo'>
        <Link to='/' className='logo-link'>
          <img src='/logo.png' alt='Логотип' />
        </Link>
      </div>

      {/* Навигация */}
      <nav className='header-nav'>
        <ul className='header-nav-list'>
          <CustomLink to='/services'>Услуги</CustomLink>
          <CustomLink to='/portfolio'>Портфолио</CustomLink>
          <CustomLink to='/about'>О компании</CustomLink>
          <CustomLink to='/communication'>Контакты</CustomLink>
          <CustomLink to='/events'>Новости</CustomLink>
        </ul>
      </nav>

      {/* Кнопки (можно показать при необходимости) */}
      {/* <div className="header-buttons-container">
        <button className="header-button">Вход</button>
        <button className="header-button">Регистрация</button>
      </div> */}
    </header>
  );
}

export default Header;

// Активная ссылка с подсветкой
function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} className='header-nav-link'>
        {children}
      </Link>
    </li>
  );
}
