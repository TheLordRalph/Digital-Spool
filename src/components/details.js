import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Typography } from '@mui/material';

import HeightIcon from '@mui/icons-material/Height';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const style = {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
};



export default function Details(props) {
    
    const dispatch = useDispatch();
    
    
    const editDescription = (id, description) => {
        const favoritesLocal = JSON.parse(localStorage.getItem('favoritesPhotos'));
        const findPhoto = favoritesLocal.find(photo => photo.id === id);
        favoritesLocal[favoritesLocal.indexOf(findPhoto)].description = description;
        localStorage.setItem('favoritesPhotos', JSON.stringify(favoritesLocal))
    }
    return (
        <div id={'details-'+props.idDetail} style={{display: 'flex', flexWrap: 'wrap', paddingTop: '10px', position: 'absolute', transform: 'translateY(-100%)', transition: 'transform 2s, z-index 2s ease 0s', zIndex: '-1'}}>
            <div style={{width: '100%', textAlign: 'center', marginBottom: '20px'}}>
                <TextField
                    id={'description-'+props.idDetail}
                    label="Descripcion"
                    multiline
                    rows={2}
                    defaultValue={props.detailsDescription}
                    variant="standard"
                    sx={{ width: '55%' }}
                />
                <IconButton onClick={() => {editDescription(props.idDetail, document.getElementById('description-'+props.idDetail).value)}} sx={{ width: '15%', height: '100%', backgroundColor: '#43A4DA', borderRadius: '20px', marginLeft: '10%', }}>
                    <ModeEditIcon />
                </IconButton>
            </div>

            <div style={style}>
                <HeightIcon sx={{ color: '#43A4DA', marginRight: '10px',}}/>
                <Typography>{props.detailsHeight}px</Typography>
            </div>
            <div style={style}>
                <FavoriteIcon sx={{ color: '#43A4DA', marginRight: '10px',}}/>
                <Typography>{props.detailsLikes}</Typography>
            </div>
            <div style={style}>
                <HeightIcon sx={{ color: '#43A4DA', marginRight: '10px', rotate: '90deg',}}/>
                <Typography>{props.detailsWidth}px</Typography>
            </div>
            <div style={style}>
                <CalendarMonthIcon sx={{ color: '#43A4DA', marginRight: '10px',}}/>
                <Typography>{props.detailsDate}</Typography>
            </div>
        </div>
    );
}