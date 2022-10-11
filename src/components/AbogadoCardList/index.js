import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import AbogadoCard from '../AbogadoCard'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

const ResponsiveDialog = ( {open, handleClose, abogadoCard} ) => {

   
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
      <div>
        <Dialog
            fullWidth
            maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"PRESENTACION DEL ABOGADO"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {JSON.stringify(abogadoCard)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cerrar
            </Button>
            <Button onClick={handleClose} autoFocus>
              Otra opcion O sin opciones?
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

// ----------------------------------------------------------------------
AbogadoCardList.propTypes = {
    details: PropTypes.array.isRequired
};


export default function AbogadoCardList({ details, ...other }) {

    const [open, setOpen] = useState(false);
    const [abogadoCard, setAbogadoCard] = useState('')
     
      const handleClose = () => {
        setOpen(false);
      };


   
    return (
        // <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" {...other}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            {open && <ResponsiveDialog open={open} handleClose={handleClose} abogadoCard={abogadoCard}/>}
        {details.map((product) => (
            <Grid key={product.id} item xs={12} sm={12} md={7}>
            <AbogadoCard details={product} setOpen={setOpen} setAbogadoCard={setAbogadoCard}/>
            </Grid>
        ))}
       </Grid>
    );
}
  