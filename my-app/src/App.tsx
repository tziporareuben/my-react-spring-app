import "./App.css";
import React, { useEffect, lazy, Suspense } from 'react';
import HomePage from "../src/components/HomePage/HomePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

import { useSelector } from "react-redux";
import { RootState } from "./myStore";
import ArticleDetails from './components/ArticleDetails/ArticleDetails'
import News from "./components/News/News";
import Health from "./components/Health/Health";
import Music from "./components/Music/Music";
import Recipes from "./components/Recipes/Recipes";
import MyDetails from './components/MyDetails/MyDetails'
import Layout from './components/Layout/Layout'
import FavoriteArticle from "./components/FavoriteArticles/FavoriteArticles";
import EditArticle from "./components/EditArticles/EditArticles";
import UsersComponent from './components/UsersComponent/UsersComponent'
import AdminchangeRole from "./components/AdminchangeRole/AdminchangeRole";
import MessageToast from './components/MessageToast/MessageToast';
import CircularProgress from '@mui/material/CircularProgress';
import ArticlesForApproval from './components/Articlesforapproval/Articlesforapproval'
const AddArticles = lazy(() => import('./components/AddArticles/AddArticles'));

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
  // בדוק את הנתיב הנוכחי
  const publicPaths = ["/login", "/signup"];
  if (!user && !publicPaths.includes(window.location.pathname)) {
    navigate("/login");
  }
}, [user, navigate]);


  return (
    <>
          <Suspense fallback={      <CircularProgress disableShrink size={80} />}>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
          <Route path="/user/:id" element={<MyDetails />} />
          <Route path="/articles/News" element={<News />} />
          <Route path="/articles/Health" element={<Health />} />
          <Route path="/articles/Music" element={<Music />} />
          <Route path="/articles/Recipes" element={<Recipes />} />
          <Route path="/myFavorite" element={<FavoriteArticle />} />
            <Route path="/admin/add" element={<AddArticles />} />
          <Route path="/udit/articles/:id" element={<EditArticle />} />
          <Route path="/admin/getusers" element={<UsersComponent />} />
          <Route path="/edit-user/:id" element={<AdminchangeRole />} />
              <Route path="/admin/approvals" element={<ArticlesForApproval />} />

        </Route>
      </Routes>
      </Suspense>

      <MessageToast />
    </>
  );
};

export default App;
