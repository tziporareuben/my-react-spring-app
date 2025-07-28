import React from 'react';
import './Ads.scss';

const adsData = [
  {
    id: 1,
    title: 'AI משנה את העולם!',
    description: 'גלה איך GPT-4 יכול לשדרג את העבודה שלך.',
    image: 'https://psagot.com/wp-content/uploads/2023/07/ai1.jpg.webp',
  },
  {
    id: 2,
    title: 'כלים חכמים לעבודה יעילה',
    description: 'AI ו-GPT - העתיד כבר כאן.',
    image: 'https://www.biu.ac.il/sites/default/files/styles/article_image_mobile/public/2023-11/AI1.jpg?itok=VMXgEoZ0',
  },
  {
    id: 3,
    title: 'הכוח של הבינה המלאכותית',
    description: 'שפר את התקשורת והפרודוקטיביות עם GPT.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png',
  },
];

const Ads: React.FC = () => {
  return (
    <div className="ads-container">
      {adsData.map(ad => (
        <div key={ad.id} className="ad-card">
          <div className="ad-content">
            <h4>{ad.title}</h4>
            <p>{ad.description}</p>
          </div>
          <img src={ad.image} alt={ad.title} />
        </div>
      ))}
    </div>
  );
};

export default Ads;
