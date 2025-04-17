import React from "react";
import "./partners.css";

const partners = [
  {
    name: "Банк Надежный",
    logo: "https://via.placeholder.com/120x60?text=Nadezhny",
    description:
      "Один из крупнейших банков России, предлагающий выгодные условия кредитования бизнеса.",
  },
  {
    name: "ФинТех Плюс",
    logo: "https://via.placeholder.com/120x60?text=FinTech+Plus",
    description:
      "Инновационная финтех-компания, предоставляющая инструменты для анализа кредитного рейтинга.",
  },
  {
    name: "СБ Финанс",
    logo: "https://via.placeholder.com/120x60?text=SB+Finance",
    description:
      "Наш партнёр по быстрому одобрению заявок и обработке бизнес-запросов.",
  },
  {
    name: "Цифробанк",
    logo: "https://via.placeholder.com/120x60?text=Digibank",
    description:
      "Цифровой банк нового поколения, работающий полностью онлайн и без бюрократии.",
  },
];

const Partners = () => {
  return (
    <div className='partners-page'>
      <header className='partners-hero'>
        <h1>Наши партнёры</h1>
        <p>С нами работают лидеры финансовой и технологической индустрии</p>
      </header>

      <section className='partners-grid'>
        {partners.map((partner, index) => (
          <div key={index} className='partner-card'>
            <img
              src={partner.logo}
              alt={partner.name}
              className='partner-logo'
            />
            <h3>{partner.name}</h3>
            <p>{partner.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Partners;
