import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../models/articles';

interface CartItem extends Article {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const Favoriteslice = createSlice({
  name: 'myCart',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<Article>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
   removeFromFavorite: (state, action: PayloadAction<number>) => {
  state.items = state.items.filter(item => item.id !== action.payload);
  
}
,
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
    // clearFavorite: (state) => {
    //   state.items = [];
    // },
  },
});

export const { addToFavorite, removeFromFavorite, setFavorites } = Favoriteslice.actions;
export { Favoriteslice };

export default Favoriteslice.reducer;