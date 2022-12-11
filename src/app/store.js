import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/searchSlice';
import favoritePhotosSlice from '../features/favoritePhotos/favoritePhotosSlice';

export const store = configureStore({
    reducer: {
        searchImages: searchSlice,
        favoritePhotos: favoritePhotosSlice,
    }
});
