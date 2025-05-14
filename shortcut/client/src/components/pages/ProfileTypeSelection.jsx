import React from 'react';
import { Link } from 'react-router-dom';
import './profiletypeselection.css'; // Import the CSS file

const ProfileTypeSelection = () => {
  return (
    <div className="profile-type-selection-page"> {/* Apply class name */}
      <h2>Select Profile Type</h2>
      <p>Please choose the type of profile you want to create:</p>
      <div>
        <Link to="/create-client-profile">
          <button>Create Client Profile</button>
        </Link>
      </div>
      <div>
        <Link to="/create-bank-profile">
          <button>Create Bank Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileTypeSelection;