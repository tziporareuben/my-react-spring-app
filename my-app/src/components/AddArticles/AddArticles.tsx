

import React, { useEffect, useState } from 'react';
import './AddArticles.scss';
import { useFormik } from 'formik';
import axios from 'axios';
import {ArticleFormValues}from '../../models/articles'

import { useSelector } from 'react-redux';
import { RootState } from '../../myStore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../redux/messageSlice';
import {Category}from '../../models/articles'


const AddArticles: React.FC = () => {
const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;  
   const navigate = useNavigate();
const [categories, setCategories] = useState<Category[]>([]);

const dispatch = useDispatch();

  useEffect(() => {
  axios.get('http://localhost:8080/categories/getall')
    .then(res => setCategories(res.data)) // `categories` is useState([])
    .catch(err => console.error('שגיאה בטעינת קטגוריות:', err));
   }, []);

//   const mySubmit = async (values:ArticleFormValues) => {
//     const selectedCategory = categories.find(c => c.code === +values.categoryid);

  
// const articleToSend = {
//   ...values,
//   authorId: userId,
//   authorName: user?.name,
//   categoryid: +values.categoryid, // לא categoryId
//   categoryname: selectedCategory?.name || '', // לא categoryName
//   datePublished: new Date().toISOString(),
//   views: 0,
//   status: 'SUBMITTED'
// };

//     try {
//        await axios.post('http://localhost:8080/articles/add', articleToSend);
//     dispatch(setMessage({ text: 'הכתבה נשלחה לאישור!', type: 'success' }));

//       navigate('/');
//     } catch (error) {
//       console.error('שגיאה בהוספת כתבה:', error);
//             dispatch(setMessage({ text: 'אירעה שגיאה' , type: 'error' }));

//     }
//   };
const mySubmit = async (values: ArticleFormValues) => {
  const selectedCategory = categories.find(c => c.name === values.categoryname);
console.log(categories);

  const articleToSend = {
    ...values,
    authorId: userId,
    authorName: user?.name,
    categoryid: selectedCategory?.code || 0, // אם קיימת ניקח את הקוד שלה, אחרת 0 (יישמר בצד שרת)
    categoryname: values.categoryname,
    datePublished: new Date().toISOString(),
    views: 0,
    status: 'SUBMITTED'
  };

  try {
    await axios.post('http://localhost:8080/articles/add', articleToSend);
    dispatch(setMessage({ text: 'הכתבה נשלחה לאישור!', type: 'success' }));
    navigate('/');
  } catch (error) {
    console.error('שגיאה בהוספת כתבה:', error);
    dispatch(setMessage({ text: 'אירעה שגיאה', type: 'error' }));
  }
};

  const formik = useFormik<ArticleFormValues>({
    initialValues: {
      title: '',
        subtitle: '', 
      content: '',
      // category: 'חדשות',
      image: '',
     categoryname:'חדשות', // שינוי חשוב
     categoryid:0,
     status: 'DRAFT'
    },
    onSubmit: mySubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="article-form">
      <h2>הוספת כתבה</h2>

      <div className="form-group">
        <label>שם העורך:</label>
        <p className="readonly">{user?.name}</p>
      </div>

      <div className="form-group">
        <label htmlFor="title">כותרת</label>
        <input
          id="title"
          name="title"
          className="form-control"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
<div className="form-group">
  <label htmlFor="subtitle">כותרת משנה</label>
  <input
    id="subtitle"
    name="subtitle"
    className="form-control"
    value={formik.values.subtitle}
    onChange={formik.handleChange}
  />
</div>

      <div className="form-group">
        <label htmlFor="content">תוכן</label>
        <textarea
          id="content"
          name="content"
          className="form-control"
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
        />
      </div>
{/* <div className="form-group">
  <label htmlFor="categoryname">קטגוריה</label>
  <input
    id="categoryname"
    name="categoryname"
    list="category-options"
    className="form-control"
    value={formik.values.categoryname}
    onChange={formik.handleChange}
  />
  <select
    id="categoryid"
    name="categoryid"
    className="form-control"
    value={formik.values.categoryid}
    onChange={formik.handleChange}
  >
    <option value="">בחר קטגוריה</option>
    {categories.map((cat) => (
      <option key={cat.code} value={cat.code}>
        {cat.name}
      </option>
    ))}
  </select>
   <datalist id="category-options">
    {categories.map(cat => (
      <option key={cat.code} value={cat.name} />
    ))}
  </datalist> 
</div> */}
<div className="form-group">
  <label htmlFor="categoryname">קטגוריה</label>
  <input
    id="categoryname"
    name="categoryname"
    list="category-options"
    className="form-control"
    value={formik.values.categoryname}
    onChange={(e) => {
      formik.setFieldValue('categoryname', e.target.value);
      formik.setFieldValue('categoryid', 0); // מאפס את הקטגוריה כי בחר חדשה
    }}
  />
  <datalist id="category-options">
    {categories.map(cat => (
      <option key={cat.code} value={cat.name} />
    ))}
  </datalist>
</div>


      <div className="form-group">
        <label htmlFor="image">קישור לתמונה</label>
        <input
          id="image"
          name="image"
          className="form-control"
          value={formik.values.image}
          onChange={formik.handleChange}
        />
      </div>

      <button type="submit" className="submit-button">שלח כתבה לאישור</button>
    </form>
  );
};

export default AddArticles;



