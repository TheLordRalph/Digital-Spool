import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem('favoritesPhotos') == null ? [] : JSON.parse(localStorage.getItem('favoritesPhotos'))

export const favoritePhotosSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers: {
        addFavoritePhoto: (state, action) => {
            state.push(action.payload);

            const favoritesLocal = localStorage.getItem('favoritesPhotos') == null ? [] : JSON.parse(localStorage.getItem('favoritesPhotos'));
            favoritesLocal.push(action.payload);
            localStorage.setItem('favoritesPhotos', JSON.stringify(favoritesLocal))
        },
        deleteFavoritePhoto: (state, action) => {
            const findPhoto = state.find(photo => photo.id === action.payload);
            if (findPhoto) {
                state.splice(state.indexOf(findPhoto), 1);

                const favoritesLocal = JSON.parse(localStorage.getItem('favoritesPhotos'));
                favoritesLocal.splice(state.indexOf(findPhoto) - 1, 1);
                localStorage.setItem('favoritesPhotos', JSON.stringify(favoritesLocal))
            }
        },
        setFavoritePhoto: (state, action) => {
            const favoritesLocal = JSON.parse(localStorage.getItem('favoritesPhotos'));
            state = [];
            favoritesLocal.map((photo) => {
                if (photo.description != null) {
                    if (photo.description.toLowerCase().includes(action.payload.toLowerCase())) {
                        state.push(photo);
                    }
                }
            });
        },
        orderBy: (state, action) => {
            switch (action.payload) {
                case 'Fecha':
                    state = state.sort((a, b) => {
                        return new Date(a.dateAdded).getTime() - 
                            new Date(b.dateAdded).getTime()
                    }).reverse();
                    break;
                case 'Width':
                    state = state.sort((a, b) => b.width - a.width);
                    break;
                case 'Height':
                    state = state.sort((a, b) => b.height - a.height);
                    break;
                case 'Likes':
                    state = state.sort((a, b) => b.likes - a.likes);
                    break;
                default:
                    state = state.sort((a, b) => {
                        return new Date(b.dateAdded).getTime() - 
                            new Date(a.dateAdded).getTime()
                    }).reverse();
            }
        },
    }
});

export const { addFavoritePhoto, deleteFavoritePhoto, setFavoritePhoto,   orderBy } = favoritePhotosSlice.actions;

export default favoritePhotosSlice.reducer; 