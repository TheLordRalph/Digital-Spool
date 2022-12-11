import { Box } from '@mui/material';
import React from 'react';
import { ImageList } from '@mui/material';
import FavoritePhotos from '../features/favoritePhotos/favoritePhotos';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { orderBy } from '../features/favoritePhotos/favoritePhotosSlice';


const ordenar = [
    { title: 'Fecha' },
    { title: 'Width' },
    { title: 'Height' },
    { title: 'Likes' },
];

export default function Favorite() {

    const dispatch = useDispatch();

    return (
        <Box>
            <Autocomplete
                id="filter-demo"
                options={ordenar}
                getOptionLabel={(option) => option.title}
                onInputChange={(event, newInputValue) => {
                    dispatch(orderBy(newInputValue));
                }}
                sx={{ width: 150, margin: '3% 10% 3% auto', }}
                renderInput={(params) =>  <TextField {...params} label="Ordenar por" />}
            />
            <ImageList id='imagenesList' variant="masonry" gap={8} sx={{ scrollbarWidth: 'none' }}>
                <FavoritePhotos />
            </ImageList>
        </Box>
    );
};
