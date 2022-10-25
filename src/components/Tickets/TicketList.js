import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TicketCard from './TicketCard'


// ----------------------------------------------------------------------

// TicketList.propTypes = {
//   tickets: PropTypes.array.isRequired
// };

export default function TicketList({ tickets }) {
  return (
    <Grid container spacing={3} >
      {tickets.ticketsTransactions.map((ticket) => (
        <Grid key={ticket._id} item xs={12} sm={6} md={3}>
        <TicketCard ticket={ticket} ticketUsers={tickets.ticketUsers}/>
        </Grid>
      ))}

      {/* {tickets.map((ticket) => (
        <Grid key={ticket._id} item xs={12} sm={6} md={3}>
          <TicketCard ticket={ticket} />
        </Grid>
      ))} */}
    </Grid>
  );
}
