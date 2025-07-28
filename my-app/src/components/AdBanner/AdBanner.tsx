import React from 'react';
import './AdBanner.scss';

const ads = [
  {
    imageUrl: 'https://storage.bhol.co.il/media/Storage/821282_tumb_800X480.jpg',
    link: 'https://example.com/ad1',
    alt: 'פרסומת 1',
  },
  {
    imageUrl: 'https://ultra.clicka1.co.il/uploads/2025/07/686a792d8c3da9.84196190.jpg',
    link: 'https://example.com/ad2',
    alt: 'פרסומת 2',
  },
  {
    imageUrl: 'https://ultra.clicka1.co.il/uploads/2025/07/686cc719bb5be1.08829660.png',
    link: 'https://example.com/ad3',
    alt: 'פרסומת 3',
  },
  {
    imageUrl: 'https://images.kikar.co.il/2025/05/08/b9331bd0-2c22-11f0-9cc5-157cc43a4474__h113_w373.gif',
    link: 'https://example.com/ad4',
    alt: 'פרסומת 4',
  },
  {
    imageUrl: 'https://images.kikar.co.il/cdn-cgi/image/format=webp,fit=contain,width=300/2025/07/03/d5711390-57da-11f0-af93-fff382fe9593__h600_w300.jpg',
    link: 'https://example.com/ad5',
    alt: 'פרסומת 5',
  },
];

const AdBanner: React.FC = () => {
  return (
    <div className="ad-banner-container">
      {ads.map((ad, idx) => (
        <a
          key={idx}
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ad-link"
        >
          <img src={ad.imageUrl} alt={ad.alt} />
        </a>
      ))}
    </div>
  );
};

export default AdBanner;
