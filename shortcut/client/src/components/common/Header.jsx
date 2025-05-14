import React from "react";
import "./header.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { header_logo } from "../../img/Img_exports"; // Импортируем логотип

function Header() {
  return (
    <header className='header'>
      {/* Логотип */}
      <div className='header-logo'>
        <Link to='/' className='logo-link'>
          <img src={header_logo} alt='Логотип' />
        </Link>
      </div>

      {/* Навигация */}
      <nav className='header-nav'>
        <ul className='header-nav-list'>
          <CustomLink to='/login'>Войти в профиль</CustomLink>
          <CustomLink to='/services'>Услуги</CustomLink>
          <CustomLink to='/partners'>Наши партнёры</CustomLink>
          <CustomLink to='/about'>О платформе</CustomLink>

        </ul>
      </nav>
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
