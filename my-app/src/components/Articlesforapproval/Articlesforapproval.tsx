// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ArticlesForApproval() {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/articles/getArticleByStatus/SUBMITTED")
//       .then((res) => setArticles(res.data))
//       .catch((err) => console.error("שגיאה:", err));
//   }, []);

//   const approveArticle = (id: number) => {
//     axios
//     .put(`http://localhost:8080/articles/update-status/${id}/APPROVED`)

//       .then(() => {
//         setArticles((prev) => prev.filter((a: any) => a.id !== id));
//       })
//       .catch((err) => console.error("שגיאה באישור:", err));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">כתבות שממתינות לאישור</h2>
//       {articles.length === 0 ? (
//         <p>אין כתבות לאישור כרגע.</p>
//       ) : (
//         articles.map((article: any) => (
//           <div key={article.id} className="border p-4 rounded mb-4 shadow">
//             <h3 className="text-lg font-semibold">{article.title}</h3>
//             <p className="text-sm text-gray-600">{article.subtitle}</p>
//             <button
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
//               onClick={() => approveArticle(article.id)}
//             >
//               אשר כתבה
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import '../HomePage/HomePage.scss';
import { Article } from '../../models/articles';
import { useDispatch } from 'react-redux';
import { setSelectedArticle } from '../../redux/articleslice';

export default function ArticlesForApproval() {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
const toggleSortDirection = () => {
  setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
};
useEffect(() => {
  axios.get('http://localhost:8080/articles/filter', {
    params: {
      status: 'SUBMITTED',
      sortBy: 'datePublished',
      direction: sortDirection
    }
  })
  .then(res => setArticles(res.data))
  .catch(err => console.error(err));
}, [sortDirection]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/getArticleByStatus/SUBMITTED")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("שגיאה:", err));
  }, []);

  const approveArticle = (id:number) => {
    axios
      .put(`http://localhost:8080/articles/update-status/${id}/APPROVED`)
      .then(() => {
        setArticles((prev) => prev.filter((a:any) => a.id !== id));
      })
      .catch((err) => console.error("שגיאה באישור:", err));
  };

 const handleEdit = (article: Article) => {
  dispatch(setSelectedArticle(article));
  navigate(`/udit/articles/${article.id}`);
};


  const handleDelete = async (id:number) => {
    try {
      await axios.delete(`http://localhost:8080/articles/delete/${id}`);
      setArticles((prev) => prev.filter((a:any) => a.id !== id));
    } catch (err) {
      console.error("שגיאה במחיקה:", err);
    }
  };

  return (
    <div className="homepage">
      <div className="content">
        <h2 className="text-2xl font-bold mb-6">כתבות שממתינות לאישור</h2>
        <button onClick={toggleSortDirection}>
  מיין לפי תאריך: {sortDirection === 'desc' ? 'מהישן לחדש' : 'מהחדש לישן'}
</button>

        {articles.length === 0 ? (
          <p>אין כתבות לאישור כרגע.</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <div key={article.id} className="article-card">
                <img src={article.image} alt={article.title} />
                <div className="card-body">
                  <h3>{article.title}</h3>
                  <p className="meta">
                    {article.authorName} | {new Date(article.datePublished).toLocaleDateString("he-IL")}
                  </p>
                  <div className="actions">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded"
                      onClick={() => approveArticle(article.id)}
                    >
                      אשר כתבה
                    </button>
                    <IconButton
                      onClick={() => handleEdit(article)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(article.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}