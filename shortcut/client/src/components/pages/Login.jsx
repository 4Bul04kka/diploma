import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Добавлен useNavigate
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Навигация для переадресации

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Вход с указанием роли
      const response = await axios.post("/api/login", {
        email,
        password,
        role: "bank",
      });

      // 2. Сохранение токена
      const token = response.data.token;
      localStorage.setItem("token", token);

      // 3. Получение профиля пользователя по email
      const profileResponse = await axios.get("/api/profiles/bank", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bankProfile = profileResponse.data;
      const userId = bankProfile.id;

      console.log(`Успешный вход в профиль банка. ID пользователя: ${userId}`);

      // 4. Переход к профилю банка
      navigate(`/profile/bank/${userId}`);
    } catch (err) {
      console.error("Ошибка входа:", err);
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
        <p className='create-profile-link'>
          Нет профиля? <Link to='/select-profile-type'>Создать профиль</Link>
        </p>
        <button type='submit'>Войти</button>
      </form>
    </div>
  );
};

export default Login;
