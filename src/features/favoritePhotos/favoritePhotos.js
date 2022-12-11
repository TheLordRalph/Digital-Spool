import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageListItem } from '@mui/material';
import TransitionsModal from '../../components/modalImagen';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { deleteFavoritePhoto } from './favoritePhotosSlice';
import ButtonFavorite from '../../components/buttonFavorite';
import DetailsButton from '../../components/detailsButton';



const FavoritePhotos = () => {

    const dispatch = useDispatch();
    const favoriteSlice = useSelector((state) => state.favoritePhotos);


    return (favoriteSlice.map((item) => (
        <div>
            <ImageListItem id={item.id} key={item.id} style={{ margin: '0px 30px 30px 30px' }} sx={{ m: '0px 30px 0 30px', transition: 'margin 2s' }}>
                <img
                    src={item.urls.full}
                    srcSet={item.urls.small}
                    alt={item.alt_description}
                    loading="lazy"
                    style={{ borderRadius: '25px', cursor: 'pointer', }}
                />
                <TransitionsModal src={item.urls.full} download={item.links.download}/>
                <DetailsButton idDetail={item.id} detailsDescription={item.description} detailsHeight={item.height} detailsLikes={item.likes} detailsWidth={item.width} detailsDate={item.dateAdded}/>
                <ButtonFavorite image={item}/>
            </ImageListItem>
        </div>
    )));
}

export default FavoritePhotos;