import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/ArticlesList.scss';
import{Articles}from '../../models/articles'
import { Article } from '../../models/articles';
import { setSelectedArticle } from '../../redux/articleslice';
import { useDispatch, useSelector } from 'react-redux';
import TopViewedArticles from '../TopViewedArticles/TopViewedArticles'
import Ads from '../Ads/Ads';
const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

      useEffect(() => {
        axios.get('http://localhost:8080/articles/getArticleByCategoryName/חדשות')
          .then(res => setArticles(res.data))
          .catch(err => console.error('שגיאה בטעינת כתבות:', err));
      }, []);
const goToArticle = (article: Article) => {
      dispatch(setSelectedArticle(article ));
  
    navigate(`/articles/${article.id}`);
  };
      
return(
     <div className="articles-list">
      <aside className="sidebar left-sidebar">
     <Ads/>
  </aside>
    <div className="articles-grid">

        {articles.map(article => (
          <div key={article.id} className="article-card" onClick={() => goToArticle(article)}>
            <img src={article.image} alt={article.title} />
            <div className="article-details">
              <h2>{article.title}</h2>
              <p><strong>עורך:</strong> {article.authorName}</p>
              <p><strong>תאריך:</strong> {new Date(article.datePublished).toLocaleDateString('he-IL')}</p>
            </div>
          </div>
        ))}
        </div>
              <aside className="sidebar right-sidebar">
    <TopViewedArticles />
  </aside>
      </div>
  );
};

export default News;
