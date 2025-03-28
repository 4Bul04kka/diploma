import React, { useState } from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer_text'>
          <p>
            Совершенно точно не переиспользованный компонент из старого проекта
          </p>
          <p>Телефон: +7-800-858-00-85</p>
        </div>
        <div className='footer_logo'></div>
      </div>
    </footer>
  );
}

export default Footer;
