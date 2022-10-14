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

const ResponsiveDialog = ( {open, handleClose, handleAbogadoSelection, abogadoCard} ) => {
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
              Cerrar y buscar
            </Button>
            <Button onClick={() => handleAbogadoSelection()} autoFocus>
              Seleccionar Abogado
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


export default function AbogadoCardList({ abogadoCard, setAbogadoCard, setList, details }) {

    const [open, setOpen] = useState(false);

      const handleClose = () => {
        setOpen(false);
      };

      const handleAbogadoSelection = () => {
        setOpen(false);
        setList([abogadoCard])
      }

    return (
        // <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center" {...other}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            {open && <ResponsiveDialog open={open} handleClose={handleClose} handleAbogadoSelection={handleAbogadoSelection} abogadoCard={abogadoCard}/>}
        {details.map((product) => (
            <Grid key={product._id} item xs={12} sm={12} md={7}>
            <AbogadoCard details={product} setOpen={setOpen} setAbogadoCard={setAbogadoCard}/>
            </Grid>
        ))}
       </Grid>
    );
}
  