import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticleDetails.scss';
import {Article}from '../../models/articles'
import Addreview from '../Addreview/Addreview';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../myStore';
import RotatingAd from '../RotatingAd/RotatingAd';
import TopViewedArticles from '../TopViewedArticles/TopViewedArticles'
import CircularProgress from '@mui/material/CircularProgress';
const ArticleDetails: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const Article = useSelector((state: RootState) => state.articles.selectedArticle);
   const Articleid=Article?.id;

 
useEffect(() => {
  if (!Articleid) return;

  axios.get(`http://localhost:8080/articles/${Articleid}`)
    .then(res => {
      const fetchedArticle = res.data;
      setArticle(fetchedArticle);

      // הגדלת views ב-1
      axios.patch(`http://localhost:8080/articles/${Articleid}`, {
        views: (fetchedArticle.views || 0) + 1
      });
    })
    .catch(err => console.error('שגיאה בטעינת כתבה:', err));
}, [Articleid]);





if (!article) {
  return (
    <div className="fullscreen-loader">
      <CircularProgress disableShrink size={80} />
    </div>
  );
}



  return (
 <div className="article-details-page">
    <div className="sidebar">
     
      <RotatingAd/>
    </div>
    
    <div className="article-content">
      <h1>{article.title}</h1>
      {article.subtitle && <h3>{article.subtitle}</h3>}
      <img src={article.image} alt={article.title} />
      <p><strong>תאריך:</strong> {new Date(article.datePublished).toLocaleDateString('he-IL')}</p>
      <p><strong>עורך:</strong> {article.authorName}</p>
      <div className="content">
        {article.content}
      </div>
   
<Addreview></Addreview>

</div>

    <div className="sidebar">
         <TopViewedArticles />

    </div>
    </div>


  );
};

export default ArticleDetails;
