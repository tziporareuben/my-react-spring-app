import "./FavoriteArticles.scss"; 
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorite } from "../../redux/Favoriteslice";
import { IconButton } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { RootState } from "../../myStore";
import  {setFavorites } from '../../redux/Favoriteslice';
import React, { useEffect, useState } from 'react';



export const FavoriteArticles: React.FC= () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorite.items);
  const user = useSelector((state: RootState) => state.auth.user);

 useEffect(() => {
    if (user?.id) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        dispatch(setFavorites(JSON.parse(savedFavorites)));
      } else {
        dispatch(setFavorites([])); 
      }
    } else {
      dispatch(setFavorites([])); 
    }
  }, [user, dispatch]);
  const handleRemove = (articleId: number) => {
    dispatch(removeFromFavorite(articleId));
  };

  return (
    <div className="cart-container mt-[8vh] mb-10 mx-auto max-w-3xl p-8 bg-white rounded-2xl shadow-2xl">
      <h2>רשימת מועדפים</h2>

      {favorites.length === 0 ? (
        <p>לא נוספו כתבות למועדפים</p>
      ) : (
        <div className="cart-items">
          {favorites.map((article) => (
            <div className="cart-item" key={article.id}>
              <img
                src={article.image || "/placeholder.jpg"}
                alt={article.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{article.title}</h4>
                <p className="line-clamp-3 text-sm text-gray-600">
                  {article.content.substring(0, 100)}...
                </p>
                <p className="text-xs text-gray-500">
                  תאריך פרסום: {new Date(article.datePublished).toLocaleDateString()}
                </p>
                <Box sx={{ position: "relative", marginBottom: 2 }}>
                  <IconButton
                    onClick={() => handleRemove(article.id)}
                    color="error"
                    sx={{
                      position: "absolute",
                      left: 2,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteArticles;
