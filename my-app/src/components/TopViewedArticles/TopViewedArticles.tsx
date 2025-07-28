import React, { useEffect, useState } from 'react';
import './TopViewedArticles.scss';
import { Article } from '../../models/articles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedArticle } from '../../redux/articleslice';

const TopViewedArticles: React.FC = () => {
  const [topViewed, setTopViewed] = useState<Article[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();


useEffect(() => {
  axios.get('http://localhost:8080/articles/top-viewed')
    .then(res => setTopViewed(res.data))
    .catch(err => console.error('שגיאה בשליפת כתבות פופולריות:', err));
}, []);

  const goToArticle = (article: Article) => {
    dispatch(setSelectedArticle(article));
    navigate(`/articles/${article.id}`);
  };

  return (
    <div className="top-articles">
      <h4>📈 הכתבות הכי נקראות</h4>
      <ul>
        {topViewed.map(article => (
          <li key={article.id} onClick={() => goToArticle(article)}>
            <img src={article.image} alt={article.title} />
            <div className="info">
              <div className="title">{article.title}</div>
              <div className="views">{article.views} צפיות</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopViewedArticles;

