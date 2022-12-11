import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteFavoritePhoto, addFavoritePhoto } from '../features/favoritePhotos/favoritePhotosSlice';

export default function ButtonFavorite(props) {

    const dispatch = useDispatch();
    const favoriteSlice = useSelector((state) => state.favoritePhotos);

    const favoriteButton = (e) => {
        const favoritePhoto = favoriteSlice.find(photo => photo.id === props.image.id);
        console.log(e);
        if (favoritePhoto) {
            dispatch((deleteFavoritePhoto(props.image.id)));
        } else {
            const hoy = new Date(Date.now());
            const image = {
                id: props.image.id,
                description: props.image.description,
                height: props.image.height,
                likes: props.image.likes,
                links: props.image.links,
                urls: props.image.urls,
                width: props.image.width,
                dateAdded: hoy.toLocaleDateString(),
            }
            dispatch((addFavoritePhoto(image)));
        }
    }

    if (favoriteSlice.find(photo => photo.id === props.image.id)) {
        return (
            <IconButton onClick={ favoriteButton } className='active' sx={{ position: 'absolute', bottom: 0, right: 0, color:'black', backgroundColor: '#fff8', borderRadius: '25px 0 25px 0', '&:hover': { backgroundColor: '#fff', } }}>
                <FavoriteIcon fontSize='large' />
            </IconButton>
        );
    } else {
        return (
            <IconButton onClick={ favoriteButton } sx={{ position: 'absolute', bottom: 0, right: 0, color:'black', backgroundColor: '#fff8', borderRadius: '25px 0 25px 0', '&:hover': { backgroundColor: '#fff', } }}>
                <FavoriteIcon fontSize='large' />
            </IconButton>
        );
    }
}