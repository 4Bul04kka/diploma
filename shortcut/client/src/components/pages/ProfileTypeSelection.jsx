import React from "react";
import { Link } from "react-router-dom";
import "./profiletypeselection.css"; // Import the CSS file

const ProfileTypeSelection = () => {
  return (
    <div className='profile-type-selection-page'>
      <h2>Выберите тип профиля</h2>
      <div>
        <Link to='/create-client-profile'>
          <button>Клиенский профиль</button>
        </Link>
      </div>
      <div>
        <Link to='/create-bank-profile'>
          <button>Банковский профиль</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileTypeSelection;
