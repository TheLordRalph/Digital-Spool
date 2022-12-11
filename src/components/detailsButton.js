import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import ButtonFavorite from './buttonFavorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Details from './details';

export default function DetailsButton(props) {

    const animationContainer = () => {
        document.getElementById(props.idDetail).classList.toggle('styleAnimationContainer');
    }

    const animationDetails = () => {
        document.getElementById('details-'+props.idDetail).classList.toggle('styleAnimationDetail');
    }

    const animationIcon = (e) => {
        e.currentTarget.children[0].classList.toggle('styleAnimationIcon');
    }

    return (
    <>
        <Details idDetail={props.idDetail} detailsDescription={props.detailsDescription} detailsHeight={props.detailsHeight} detailsLikes={props.detailsLikes} detailsWidth={props.detailsWidth} detailsDate={props.detailsDate}/>
        <IconButton onClick={(e) => {animationContainer(); animationDetails(); animationIcon(e)}} sx={{ position: 'absolute', width: '100%', height:'51px', bottom: 0, right: 0, color:'black', backgroundColor: '#fff8', borderRadius: '0px 0 25px 25px', '&:hover': { backgroundColor: '#fff8', } }}>
            <ExpandMoreIcon style={{ transition: 'transform 1s' }}/>
        </IconButton>
    </>
    );
}