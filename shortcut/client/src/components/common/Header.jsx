import React from "react";
import "./header.css";

import { Link, useMatch, useResolvedPath } from "react-router-dom";

function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header-logo'>
          <Link to='/' className='logo-link'></Link>
        </div>
        <div className='header-navbar-container'>
          <nav className='header-nav'>
            <ul className='header-nav-list'>
              <CustomLink to='/services' className='header-nav-link'>
                Услуги
              </CustomLink>
              <CustomLink to='/portfolio' className='header-nav-link'>
                Портфолио
              </CustomLink>
              <CustomLink to='/about' className='header-nav-link'>
                О компании
              </CustomLink>
              <CustomLink to='/communication' className='header-nav-link'>
                Контакты
              </CustomLink>
              <CustomLink to='/events' className='header-nav-link'>
                Новости
              </CustomLink>
            </ul>
          </nav>
        </div>
        <div className='header-buttons-container'>
          <button className='header-button'>Вход</button>
          <button className='header-button'>Регистрация</button>
        </div>
      </div>
    </header>
  );
}

export default Header;

function CustomLink({ to, className, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} className={className}>
        {children}
      </Link>
    </li>
  );
}
