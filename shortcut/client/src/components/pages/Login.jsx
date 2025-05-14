import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use relative path, Nginx will proxy this to the backend
      const response = await axios.post("/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      window.location.href = "/"; // перенаправление после входа
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
        <h2>Вход в профиль</h2>
        {error && <p className='error'>{error}</p>}
        <input
          type='email'
          placeholder='Электронная почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Войти</button>
      </form>
      {/* Link to profile creation */} {/* Added link here */}
      <div className="create-profile-link">
        <p>Нет профиля? <Link to="/select-profile-type">Создать профиль</Link></p>
      </div>
    </div>
  );
};

export default Login;
