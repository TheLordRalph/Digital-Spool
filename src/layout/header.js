import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { NavLink, useLocation, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setSearch } from '../features/search/searchSlice';
import { setFavoritePhoto } from '../features/favoritePhotos/favoritePhotosSlice';

const Search = styled('div')(({ theme }) => ({
    marginLeft: '25%',
    display: 'flex',
    '& .MuiFormControl-root': {
        position: 'absolute',
        right: '10px',
        top: '0',
        width: 'min-content',
        backgroundColor: '#0B2838',
        padding: '14px 0',
        '& .MuiInputBase-root': {
            flexDirection: 'row-reverse',
            color: 'white',
            border: '2px solid white',
            borderRadius: '100px',
            '&::after': {
                border: 'none',
            },
            '&::before': {
                border: 'none',
                transition: 'none',
            },
            '&:hover': {
                border: '2px solid white',
                backgroundColor: '#ffffff15',
                '&:not(.Mui-disabled)::before': {
                    border: 'none',
                }
            },
            '& .MuiInputBase-input': {
                padding: '5px 40px 5px 10px',
                width: '0px',
                transition: 'width 0.4s ease-out .0s',
                '&:focus': {
                    width: '20vw',
                    backgroundColor: '#ffffff15',
                    borderRadius: '100px',
                }
            }
        },
    },
    '& .SearchCancelButton': {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '15px 0',
        color: 'currentColor',
    },
    [theme.breakpoints.up('400')]: {
        '& .MuiFormControl-root': {
            '& .MuiInputBase-root': {
                '& .MuiInputBase-input': {
                    '&:focus': {
                        width: '35vw',
                    }
                }
            },
        },
    },
    [theme.breakpoints.up('550')]: {
        marginLeft: '10%',
        '& .MuiFormControl-root': {
            position: 'static',
            width: 'min-content',
            padding: '14px 0',
            '& .MuiInputBase-root': {
                '& .MuiInputBase-input': {
                    width: '25vw',
                    transition: 'none',
                    '&:focus': {
                        width: '25vw',
                    }
                }
            },
        },
    }
}));

export default function Header() {

    const dispatch = useDispatch();
    const sampleLocation = useLocation();
    console.log(sampleLocation);

    const openSearch = () => {
        if (window.innerWidth < 550) {
            document.getElementById("cancelSearch").setAttribute('style', 'display: block;');
            document.getElementById("search").childNodes[0].setAttribute('style', 'right: 60px;');
            document.getElementById("input-with-icon-textfield").focus();
        }
    }

    const closeSearch = () => {
        document.getElementById("cancelSearch").setAttribute('style', 'display: none;');
        if (window.innerWidth < 550) {
            document.getElementById("search").childNodes[0].setAttribute('style', '');
            document.getElementById("input-with-icon-textfield").blur();
        }
    }

    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById("search") || e.target === document.getElementById("searchButton").childNodes[0] || e.target === document.getElementById("searchButton").childNodes[0].childNodes[0] || e.target === document.getElementById("input-with-icon-textfield")) {
        } else {
            closeSearch();
        }
    })

    return (
        <Box sx={{ flexGrow: 1, position:'sticky', top:'0', zIndex:'10' }}>
        <AppBar position="static" sx={{ background: '#0B2838' }}>
            <Toolbar sx={{ height: '65px' }}>

                <IconButton component={NavLink} to="/" color='inherit' sx={{ marginRight: '2%' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z"/>
                    </svg>
                </IconButton>
                <IconButton component={NavLink} to="/favorite-photos" color='inherit' sx={{ marginRight: '10%' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                </IconButton>

                <Typography id='logo' variant="h6" textAlign={'center'} mx='auto' component="a" herf='/' sx={{ fontFamily: 'mansalva' }} sm={{ marginRight: 'auto' }}>
                    Digital Spool
                </Typography>
                <Search id="search">
                    <TextField 
                        id="input-with-icon-textfield"
                        placeholder='Search...'
                        onChange={(e) => {if (sampleLocation.pathname === '/favorite-photos') {dispatch(setFavoritePhoto(e.target.value))} else {dispatch(setSearch(e.target.value))}}}
                        InputProps={{
                        startAdornment: (
                            <IconButton id='searchButton' size="small" onClick={openSearch} sx={{ position: 'absolute', 
                            color: 'white', 
                            borderRadius: '100px',
                            right: '-2px',
                            margin: '10px 0px',
                            padding: '0',
                            minWidth: '54px' }}>
                                <SearchIcon fontSize='large'/>
                            </IconButton>
                        ),
                        }}
                        variant="standard"
                    />
                    <IconButton id='cancelSearch' onClick={closeSearch} className="SearchCancelButton" sx={{ display: 'none' }}>
                        <ClearIcon fontSize='large'/>
                    </IconButton>
                </Search>
            </Toolbar>
        </AppBar>
        </Box>
    );
}