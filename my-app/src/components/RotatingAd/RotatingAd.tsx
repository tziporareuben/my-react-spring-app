import React, { useState, useEffect } from "react";
import "./RotatingAd.scss";

const mainAds = [
  {
    image:
      "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=400&q=80",
    url: "https://unsplash.com/photos/JmuyB_LibRo",
    alt: "ספרים ומדיה",
    title: "העולם שבספרים",
    subtitle: "הרפתקאות חדשות מחכות לך",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    url: "https://unsplash.com/photos/_RBcxo9AU-U",
    alt: "טבע ונוף",
    title: "ברוכים הבאים לטבע",
    subtitle: "גלו יופי בלתי נגמר",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80",
    url: "https://unsplash.com/photos/Dm-qxdynoEc",
    alt: "מוזיקה ותופים",
    title: "מוזיקה בוערת בלב",
    subtitle: "קצב שיגרום לכם לזוז",
  },
];

const smallAdsInitial = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
    url: "https://unsplash.com/photos/NodtnCsLdTE",
    alt: "קפה חם",
    title: "קפה איכותי בכל בוקר",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
    url: "https://unsplash.com/photos/5QgIuuBxKwM",
    alt: "טיולים בטבע",
    title: "טיולים מחוץ לעיר",
  },
  {
    id: 3,
    image:"https://media.madatapro.com/banners/2037/2077/13244/239769/1.jpg",
    url: "https://unsplash.com/photos/IgUR1iX0mqM",
    alt: "ספורט",
    title: "כושר ואנרגיה כל יום",
  },
];

const RotatingAd: React.FC = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const [smallAds, setSmallAds] = useState(smallAdsInitial);
  const [closedAds, setClosedAds] = useState<number[]>([]); // רשימת פרסומות שנסגרו

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % mainAds.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseSmallAd = (id: number) => {
    // מסמן את הפרסומת כנסגרת, לא מוחק אותה
    setClosedAds((prev) => [...prev, id]);
  };

  const handleReopenSmallAd = (id: number) => {
    setClosedAds((prev) => prev.filter((adId) => adId !== id));
  };

  return (
    <div className="ads-container">
      <a
        href={mainAds[currentAd].url}
        target="_blank"
        rel="noopener noreferrer"
        className="rotating-ad"
        key={currentAd}
      >
        <img src={mainAds[currentAd].image} alt={mainAds[currentAd].alt} />
        <div className="text-overlay">
          <h2 className="title">{mainAds[currentAd].title}</h2>
          <p className="subtitle">{mainAds[currentAd].subtitle}</p>
        </div>
      </a>

      <div className="small-ads-vertical">
        {smallAds.map((ad) =>
          closedAds.includes(ad.id) ? (
            <div key={ad.id} className="small-ad-closed" onClick={() => handleReopenSmallAd(ad.id)} title="לחץ כדי להציג את הפרסומת מחדש">
              <span>×</span>
            </div>
          ) : (
            <div key={ad.id} className="small-ad-vertical">
              <button
                className="close-btn"
                onClick={() => handleCloseSmallAd(ad.id)}
                aria-label="Close ad"
              >
                &times;
              </button>
              <a href={ad.url} target="_blank" rel="noopener noreferrer">
                <img src={ad.image} alt={ad.alt} />
                <div className="small-ad-title">{ad.title}</div>
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RotatingAd;

