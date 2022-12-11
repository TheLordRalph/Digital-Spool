import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

import naturalezaJPG from '../resources/categoria01.jpg';
import animalesJPG from '../resources/categoria02.jpg';
import espacioJPG from '../resources/categoria03.jpg';
import comidaBebidaJPG from '../resources/categoria04.jpg';
import fotografiaCallejeraJPG from '../resources/categoria05.jpg';
import deportesJPG from '../resources/categoria06.jpg';
import retroJPG from '../resources/categoria07.jpg';
import cochesJPG from '../resources/categoria08.jpg';
import arteJPG from '../resources/categoria09.jpg';
import monumentosJPG from '../resources/categoria10.jpg';
import retraroCallejeroJPG from '../resources/categoria11.jpg';

import Search from '../features/search/search';
import { setSearch, setPage } from '../features/search/searchSlice';
import { useDispatch, useSelector } from 'react-redux';


const categorias = [
    {
        url: naturalezaJPG,
        title: 'Nature',
    },
    {
        url: animalesJPG,
        title: 'Animals',
    },
    {
        url: espacioJPG,
        title: 'Space',
    },
    {
        url: comidaBebidaJPG,
        title: 'Foods and Drinks',
    },
    {
        url: fotografiaCallejeraJPG,
        title: 'Street Photography',
    },
    {
        url: deportesJPG,
        title: 'Sports',
    },
    {
        url: retroJPG,
        title: 'Retro',
    },
    {
        url: cochesJPG,
        title: 'Cars',
    },
    {
        url: arteJPG,
        title: 'Art',
    },
    {
        url: monumentosJPG,
        title: 'Monuments',
    },
    {
        url: retraroCallejeroJPG,
        title: 'Street Portreit',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: '130px',
    minWidth: '240px',
    borderRadius: '25px',
    margin: '0 20px',
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.4,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            transform: 'scale(1.1)',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: '25px',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    borderRadius: '25px',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create('opacity'),
    borderRadius: '25px',
}));



export default function Home() {
    
    function moveCategorias(direccion) {
        const categorias = document.getElementById('categorias');
        const pxToScroll = 300;

        if (direccion === 'izquierda') {
            if (categorias.scrollLeft > 0) {
                if (categorias.scrollLeft - pxToScroll > 0) {
                    categorias.scrollTo(categorias.scrollLeft - pxToScroll, 0)
                } else {
                    categorias.scrollTo(0, 0)
                    document.getElementById('buttonCategoriasIzquierda').setAttribute('style', 'display: none');
                }
            } else {
                document.getElementById('buttonCategoriasIzquierda').setAttribute('style', 'display: none');
            }


        } else if (direccion === 'derecha') {
            if (categorias.scrollLeft < categorias.scrollLeftMax) {
                if (categorias.scrollLeft + pxToScroll < categorias.scrollLeftMax) {
                    categorias.scrollTo(categorias.scrollLeft + pxToScroll, 0)
                } else {
                    categorias.scrollTo(categorias.scrollLeftMax, 0)
                    document.getElementById('buttonCategoriasDerecha').setAttribute('style', 'display: none');
                }
            } else {
                document.getElementById('buttonCategoriasDerecha').setAttribute('style', 'display: none');
            }


        }
    };

    function hideButtonCategorias() {
        const categorias = document.getElementById('categorias');

        if (categorias.scrollLeft > 0) {
            document.getElementById('buttonCategoriasIzquierda').setAttribute('style', 'display: inline-flex');
        } else {
            document.getElementById('buttonCategoriasIzquierda').setAttribute('style', 'display: none');
        }

        if (categorias.scrollLeft >= categorias.scrollLeftMax) {
            document.getElementById('buttonCategoriasDerecha').setAttribute('style', 'display: none');
        } else {
            document.getElementById('buttonCategoriasDerecha').setAttribute('style', 'display: inline-flex');
        }
    }

    const dispatch = useDispatch();
    const searchImages = useSelector((state) => state.searchImages);
    console.log(searchImages);
    
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY >= window.scrollMaxY && searchImages.results.length == (searchImages.page+1)) {
    //         const actualPage = searchImages.page;
    //         dispatch(setPage(actualPage+1));
    //     }
    // }); 


    return (
        <Box >
            {/* Categorias */}
            <div id='categorias' onScroll={hideButtonCategorias} style={{ display: 'flex', width: '-moz-available', overflowX: 'scroll', scrollbarWidth: 'none', position: 'static', height: '130px', margin: '50px 0', padding: '0 30px', scrollBehavior: 'smooth' }}>
                <IconButton id='buttonCategoriasIzquierda' onClick={() => { moveCategorias('izquierda') }} sx={{ display: 'none', position: 'absolute', left: '0', padding: '0', height: '130px', color: 'black', zIndex: '2', borderRadius: '0 10px 10px 0', background: '-webkit-linear-gradient(left, #fffA, #fff0)' }}>
                    <ChevronLeftIcon fontSize='large' title='izquierda' />
                </IconButton>
                {categorias.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        onClick={() => {dispatch(setSearch(image.title));}}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="#0B2838"
                                sx={{
                                    fontFamily: 'Leckerli One',
                                    fontSize: '25px',
                                    lineHeight: '1.3',
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    transition: 'transform 0.5s',
                                    textShadow: '1px 0 #43A4DA, -1px 0 #43A4DA, 0 1px #43A4DA, 0 -1px #43A4DA, 1px 1px #43A4DA, -1px -1px #43A4DA, 1px -1px #43A4DA, -1px 1px #43A4DA',
                                }}
                            >
                                {image.title}
                            </Typography>
                        </Image>
                    </ImageButton>
                ))}
                <IconButton id='buttonCategoriasDerecha' onClick={() => { moveCategorias('derecha') }} sx={{ position: 'absolute', right: '0', padding: '0', height: '130px', color: 'black', zIndex: '2', borderRadius: '10px 0 0 10px', background: '-webkit-linear-gradient(right, #fffA, #fff0)' }}>
                    <ChevronRightIcon fontSize='large' />
                </IconButton>
            </div>
            {/* Galeria de imagenes */}
            <div style={{ width: 'auto', height: 'auto', overflowY: 'scroll', margin: '0 5%', textAlign: 'center' }}>
                <ImageList id='imagenesList' variant="masonry" gap={8} sx={{ scrollbarWidth: 'none' }}>
                    <Search/>   
                </ImageList>
            </div>
        </Box>
    );
};