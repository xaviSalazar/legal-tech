import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import AbogadoCard from '../AbogadoCard'


// ----------------------------------------------------------------------
AbogadoCardList.propTypes = {
    details: PropTypes.array.isRequired
};

export default function AbogadoCardList({ details, ...other }) {
    return (
        <Grid container spacing={3} {...other}>
        {details.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={3}>
            <AbogadoCard details={product} />
            </Grid>
        ))}
        </Grid>
    );
}
  