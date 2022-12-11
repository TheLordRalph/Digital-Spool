import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { IconButton } from '@mui/material';
import { saveAs } from 'file-saver';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

export default function TransitionsModal(prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{ position: 'absolute', top:'0', width:'100%', height:'100%'}}>
            <Button onClick={handleOpen} sx={{ position: 'relative', width:'100%', height:'100%' }}></Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className='modalImage'>
                        <IconButton onClick={() => {saveAs(prop.src, 'image.jpg')}} sx={{ position: 'absolute', color:'black', background:'white', right:'20px', top:'20px', '&:hover': { backgroundColor:'white'} }}>
                            <FileDownloadIcon fontSize='large' />
                        </IconButton>
                        <img src={prop.src} style={{ width:'inherit' }}/>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}