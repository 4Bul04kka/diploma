import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createclientprofile.css";

const CreateClientProfile = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    full_name: "",
    company_name: "",
    inn: "",
    kpp: "",
    address: "",
    financial_info: "",
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
    setError(""); // Clear previous errors

    if (profileData.password !== profileData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Use the correct relative path: /api/profiles/client
      const response = await axios.post("/api/profiles/client", {
        email: profileData.email,
        full_name: profileData.full_name,
        company_name: profileData.company_name,
        inn: profileData.inn,
        kpp: profileData.kpp,
        address: profileData.address,
        financial_info: profileData.financial_info,
        password: profileData.password, // Include password in the request
      });
      console.log("Profile created successfully:", response.data);
      // Redirect to the newly created client profile page
      navigate(`/profile/client/${response.data.profileId}`);
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(err.response?.data?.message || "Error creating profile"); // Display backend error message
    }
  };

  return (
    <div className='create-client-profile-page'>
      <h2>Создать профиль представителя компании</h2>
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
          <label htmlFor='company_name'>Наименование компании:</label>
          <input
            type='text'
            id='company_name'
            name='company_name'
            value={profileData.company_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='inn'>ИНН:</label>
          <input
            type='text'
            id='inn'
            name='inn'
            value={profileData.inn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='kpp'>KPP:</label>
          <input
            type='text'
            id='kpp'
            name='kpp'
            value={profileData.kpp}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='address'>Физический адрес:</label>
          <input
            type='text'
            id='address'
            name='address'
            value={profileData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor='financial_info'>Прочая финансовая информация:</label>
          <textarea
            id='financial_info'
            name='financial_info'
            value={profileData.financial_info}
            onChange={handleInputChange}
            required
          ></textarea>
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

export default CreateClientProfile;
