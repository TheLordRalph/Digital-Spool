import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as React from 'react';
import { searchImages } from "./searchSlice";
import TransitionsModal from "../../components/modalImagen";
import { addFavoritePhoto, deleteFavoritePhoto } from "../favoritePhotos/favoritePhotosSlice";
import ButtonFavorite from "../../components/buttonFavorite";

import ImageListItem from '@mui/material/ImageListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton, CircularProgress, Typography } from '@mui/material';


function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

const Search = () => {

    const dispatch = useDispatch();
    const searchSlice = useSelector((state) => state.searchImages);
    const favoriteSlice = useSelector((state) => state.favoritePhotos);
    const searchTermDebounce = useDebounce(searchSlice.term, 200);

    useEffect(() => {
        dispatch(searchImages({ searchTerm: searchTermDebounce, searchPage: searchSlice.page }));
    }, [dispatch, searchTermDebounce, searchSlice.page]);

    switch (searchSlice.status) {
        case "fulfilled":
            const result = searchSlice.results[searchSlice.page].results.results === undefined ? searchSlice.results[searchSlice.page].results : searchSlice.results[searchSlice.page].results.results;
            if (result.length <= 0) {
                return <Typography variant="h4" style={{ position: 'relative', top:'0', right:'-100%' }} textAlign={'center'}>Sin resultados.</Typography>;
            }
            return (result.map((item) => (
                <ImageListItem key={item.id} style={{ margin: '0px 30px 30px 30px' }} sx={{ m: '0px 30px 0 30px' }}>
                    <img
                        src={item.urls.full}
                        srcSet={item.urls.small}
                        alt={item.alt_description}
                        loading="lazy"
                        style={{ borderRadius: '25px', cursor: 'pointer', }}
                    />
                    <TransitionsModal src={item.urls.full}/>
                    <ButtonFavorite image={item}/>
                </ImageListItem>
            )));
        case "error":
            return <Typography variant="h4" style={{ position: 'relative', top:'0', right:'-100%' }} textAlign={'center'}>Lo sentimos mucho, no se ha podido obtener las imagenes</Typography>;
        case "loading":
        default:
            return <CircularProgress style={{ width: '70px', height: '70px', position: 'relative', top:'0', right:'-100%' }} />;
    }
}

export default Search;
