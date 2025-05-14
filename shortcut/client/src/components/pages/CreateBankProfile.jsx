import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createbankprofile.css'; // Import the CSS file

const CreateBankProfile = () => {
  const [profileData, setProfileData] = useState({
    email: '',
    full_name: '',
    bank_branch: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add client-side validation

    try {
      // Assuming your backend is running on http://localhost:3001
      const response = await axios.post('http://localhost:3001/api/profile/bank', profileData);
      console.log('Bank profile created successfully:', response.data);
      // Redirect to the newly created bank profile page
      navigate(`/profile/bank/${response.data.profileId}`);
    } catch (error) {
      console.error('Error creating bank profile:', error);
      // TODO: Display error message to the user
    }
  };

  return (
    <div className="create-bank-profile-page"> {/* Apply class name */}
      <h2>Create Bank Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="full_name">Full Name:</label>
          <input type="text" id="full_name" name="full_name" value={profileData.full_name} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="bank_branch">Bank Branch:</label>
          <input type="text" id="bank_branch" name="bank_branch" value={profileData.bank_branch} onChange={handleInputChange} required />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateBankProfile;
