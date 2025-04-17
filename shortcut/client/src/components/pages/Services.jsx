import React from "react";
import "./services.css";

const services = [
  {
    title: "Подбор кредитных предложений",
    description:
      "Мы анализируем вашу заявку и находим наиболее выгодные предложения от банков-партнёров.",
  },
  {
    title: "Финансовый скоринг",
    description:
      "Интеллектуальная система рассчитывает кредитный рейтинг бизнеса для повышения шансов на одобрение.",
  },
  {
    title: "Помощь в подготовке документов",
    description:
      "Поддержка при сборе и оформлении всех необходимых документов для подачи заявки в банк.",
  },
  {
    title: "Сопровождение до получения кредита",
    description:
      "Личный менеджер будет с вами на связи от начала до конца, чтобы вы получили финансирование без лишней волокиты.",
  },
];

const Services = () => {
  return (
    <div className='services-page'>
      <header className='services-hero'>
        <h1>Наши услуги</h1>
        <p>
          Всё для того, чтобы ваш бизнес получил финансирование быстро и удобно
        </p>
      </header>

      <section className='services-grid'>
        {services.map((service, index) => (
          <div key={index} className='service-card'>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Services;
