// articleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../models/articles';



// export interface Article {
//   id: string;
//   title: string;
//   content: string;
//   authorId: number;
//   datePublished: string;
//   imageUrl?: string;
// }

interface ArticleState {
  articles: Article[];
  selectedArticle: Article | null;
}

const initialState: ArticleState = {
  articles: [],
  selectedArticle: null,
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    addArticle: (state, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
    },
    setSelectedArticle: (state, action: PayloadAction<Article>) => {
      state.selectedArticle = action.payload;
    },
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
});

export const {
  setArticles,
  addArticle,
  setSelectedArticle,
  clearSelectedArticle,
} = articleSlice.actions;

export default articleSlice.reducer;
