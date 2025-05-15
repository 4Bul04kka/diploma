import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createbankprofile.css";

const CreateBankProfile = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    full_name: "",
    bank_branch: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (profileData.password !== profileData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Use the correct relative path: /api/profiles/bank
      const response = await axios.post("/api/profiles/bank", {
        email: profileData.email,
        full_name: profileData.full_name,
        bank_branch: profileData.bank_branch,
        password: profileData.password, // Include password in the request
      });
      console.log("Bank profile created successfully:", response.data);
      // Redirect to the newly created bank profile page
      navigate(`/profile/bank/${response.data.profileId}`);
    } catch (err) {
      console.error("Error creating bank profile:", err);
      setError(err.response?.data?.message || "Error creating bank profile"); // Display backend error message
    }
  };

  return (
    <div className='create-bank-profile-page'>
      <h2>Создать профиль представителя банка</h2>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={profileData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='full_name'>ФИО:</label>
          <input
            type='text'
            id='full_name'
            name='full_name'
            value={profileData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='bank_branch'>Представляемый банк:</label>
          <input
            type='text'
            id='bank_branch'
            name='bank_branch'
            value={profileData.bank_branch}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Пароль:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={profileData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Подтвердите пароль:</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={profileData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type='submit'>Создать профиль</button>
      </form>
    </div>
  );
};

export default CreateBankProfile;
