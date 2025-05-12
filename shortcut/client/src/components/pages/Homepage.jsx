import React from "react";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";
import { FaCheckCircle } from "react-icons/fa";

import "./homepage.css";
import { Link } from "react-router";

// Переиспользуемый компонент для секции
const Section = ({ title, children }) => (
  <section className='section'>
    <h2>{title}</h2>
    {children}
  </section>
);

// Герой-блок
const Hero = () => (
  <div className='hero'>
    <h1>Получите предодобренный кредит для бизнеса</h1>
    <p>Платформа, где банки сами находят вас</p>
    <Link to='/login'><Button>Оставить заявку</Button></Link>
  </div>
);

// Блок "Как это работает"
const HowItWorks = () => (
  <Section title='Как это работает?'>
    <div className='card-grid'>
      {[
        "Регистрация",
        "Размещение заявки",
        "Отклики от банков",
        "Получение кредита",
      ].map((step, index) => (
        <Card key={index} className='card'>
          <CardContent>
            <FaCheckCircle className='card-icon' />
            <p className='card-text'>{step}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// Блок "Преимущества сервиса"
const Benefits = () => (
  <Section title='Преимущества сервиса'>
    <div className='card-grid'>
      {[
        "Быстрое оформление",
        "Прозрачные условия",
        "Лучшие предложения",
        "Безопасность данных",
      ].map((benefit, index) => (
        <Card key={index} className='card'>
          <CardContent>
            <p className='card-text'>{benefit}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// Главная страница
const Homepage = () => {
  return (
    <div className='homepage'>
      <Hero />
      <HowItWorks />
      <Benefits />
    </div>
  );
};

export default Homepage;
