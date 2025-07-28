import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux/authslice'; // תוודאי שזה הנתיב הנכון אל הקובץ שלך
import articleReducer from './redux/articleslice'
import favoriteReducer from './redux/Favoriteslice'
import messageReducer from './redux/messageSlice'
// יצירת ה-store הכללי
export const myStore = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
     favorite:favoriteReducer,
     message:messageReducer
  },
    devTools: process.env.NODE_ENV !== 'production',

});

// טיפוסים בשביל TypeScript
export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
//יכול
export default myStore ;