import React from "react";
import Button from "../ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { FaCheckCircle } from "react-icons/fa";

// Переиспользуемый компонент для секции
const Section = ({ title, children }) => (
  <section className='py-12 text-center'>
    <h2 className='text-3xl font-bold mb-6'>{title}</h2>
    {children}
  </section>
);

// Герой-блок
const Hero = () => (
  <div className='text-center py-16 bg-blue-500 text-white'>
    <h1 className='text-4xl font-bold'>
      Получите предодобренный кредит для бизнеса
    </h1>
    <p className='mt-4 text-lg'>Платформа, где банки сами находят вас</p>
    <Button className='mt-6 bg-white text-blue-500'>Оставить заявку</Button>
  </div>
);

// Блок "Как это работает"
const HowItWorks = () => (
  <Section title='Как это работает?'>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      {[
        "Регистрация",
        "Размещение заявки",
        "Отклики от банков",
        "Получение кредита",
      ].map((step, index) => (
        <Card key={index} className='p-6'>
          <CardContent>
            <FaCheckCircle className='text-blue-500 text-3xl mx-auto mb-3' />
            <p className='font-semibold'>{step}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// Блок "Преимущества сервиса"
const Benefits = () => (
  <Section title='Преимущества сервиса'>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      {[
        "Быстрое оформление",
        "Прозрачные условия",
        "Лучшие предложения",
        "Безопасность данных",
      ].map((benefit, index) => (
        <Card key={index} className='p-6'>
          <CardContent>
            <p className='font-semibold'>{benefit}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

// Главная страница
const Homepage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Benefits />
      {/* Здесь можно добавить другие секции */}
    </div>
  );
};

export default Homepage;
