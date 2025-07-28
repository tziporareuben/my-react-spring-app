

import { useNavigate } from 'react-router-dom';
import './Addreview.scss';
import { useFormik } from 'formik';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../myStore';
import { ReviewFormInput, Review } from '../../models/reviews'; // עדכון חשוב

import React, { useEffect, useState } from 'react';
import { IconButton, Box, Typography, TextField, Button, Paper } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { setMessage } from '../../redux/messageSlice';
import { useDispatch } from 'react-redux';


const Addreview: React.FC = () => {
  const selectedArticle = useSelector((state: RootState) => state.articles.selectedArticle);
  const articleId = selectedArticle?.id;
const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const userName = user?.name || '';
  const [reviews, setReviews] = useState<Review[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!articleId) return;

   axios.get(`http://localhost:8080/reviews/byArticle/${articleId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error('שגיאה בטעינת התגובות:', err));
  }, [articleId]);

  const mySubmit = async (values: ReviewFormInput) => {
    if (!articleId || !userId) {
dispatch(setMessage({ text: "משתמש או כתבה לא זמינים", type: "error" }));
      return;
    }

    const reviewToSend = {
      ...values,
      articleId,
      userId,
      datePublished: new Date().toISOString(),
    };

    try {

      const response = await axios.post('http://localhost:8080/reviews/add', reviewToSend);
      setReviews(prev => [...prev, response.data]); // נוסיף את מה ש־json-server החזיר כולל ה־id
      formik.resetForm({ values: { name: userName, comment: '' } });
      console.log(userId)
      dispatch(setMessage({ text: "התגובה נוספה בהצלחה!", type: "success" }));

    } catch (error) {
      console.error('שגיאה בהוספת תגובה:', error);
dispatch(setMessage({ text: "אירעה שגיאה", type: "error" }));
    }
  };

  const handleDeleteReview = async (commentId: number) => {
    try {
      await axios.delete(`http://localhost:8080/reviews/delete/${commentId}`);
      setReviews(prev => prev.filter(r => r.id !== commentId));
    } catch (err) {
      console.error('שגיאה במחיקת תגובה:', err);
      dispatch(setMessage({ text: " שגיעה במחיקת תגובה", type: "error" }));

    }
  };

  const formik = useFormik<ReviewFormInput>({
    initialValues: { name: userName, comment: '' },
    onSubmit: mySubmit,
    enableReinitialize: true, // חשוב כדי שהשם יתעדכן אם המשתמש משתנה
  });

  return (
    <div className="add-review-container">
      <Typography variant="h5" gutterBottom>תגובות לכתבה</Typography>

      {reviews.length === 0 ? (
        <Typography>אין תגובות עדיין</Typography>
      ) : (
        reviews.map((rev) => (
          <Paper key={rev.id} className="review-item" elevation={3}>
            <Typography variant="subtitle1"><strong>{rev.name}:</strong></Typography>
            <Typography variant="body1">{rev.comment}</Typography>
      <small>
  {new Date(rev.datePublished ?? "").toLocaleString('he-IL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })}
</small>


            {rev.userId === userId && (
              <IconButton
                onClick={() => handleDeleteReview(rev.id!)}
                color="error"
                className="delete-button"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Paper>
        ))
      )}
{(user?.role!=1&&user?.role!=0)&&(
      <form onSubmit={formik.handleSubmit} className="review-form">
        <TextField
          label="שם"
          id="name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          label="תגובה"
          id="comment"
          name="comment"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formik.values.comment}
          onChange={formik.handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          הוסף תגובה
        </Button>
      </form>)}
    </div>
  );
};

export default Addreview;
