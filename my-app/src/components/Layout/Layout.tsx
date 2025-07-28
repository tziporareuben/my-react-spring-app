

import SearchBar from '../../components/SearchBar/SearchBar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../myStore';
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { logout } from '../../redux/authslice';
import { Article } from '../../models/articles';
import  {setFavorites } from '../../redux/Favoriteslice';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const roleNum = Number(user?.role);


  const handleLogout = () => {
      dispatch(setFavorites([]));

    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="layout" dir="rtl">
      <nav className="main-nav">
        <div className="container">
          <div className="logo-container" onClick={() => navigate('/')}>
<         img src="/logo.png" alt="News Logo" className="logo-image" />
          </div>

          <div className="nav-links">
            <span onClick={() => navigate(`/user/${user?.id}`)}>הפרטים שלי</span>
            <span onClick={() => navigate('/articles/News')}>חדשות</span>
            <span onClick={() => navigate('/articles/Health')}>בריאות</span>
            <span onClick={() => navigate('/articles/Music')}>מוזיקה</span>
            <span onClick={() => navigate('/articles/Recipes')}>מתכונים</span>
            <span onClick={() => navigate(`/myFavorite`)}>המעודפים שלי</span>
            {(roleNum === 1 || roleNum === 0) && (
              <span onClick={() => navigate('/admin/add')}>הוספת כתבה</span>
            )}
             {roleNum === 0 && (
  <>
    <span onClick={() => navigate('/admin/getusers')}>משתמשים</span>
    <span onClick={() => navigate('/admin/approvals')}>כתבות לאישור</span>
  </>
)}
           
            <Tooltip title="התנתקות">
              <IconButton onClick={handleLogout} sx={{ color: "white" }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </nav>

      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
