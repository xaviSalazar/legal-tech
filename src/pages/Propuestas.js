import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import TicketList from '../components/Tickets/TicketList';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import TICKETS from '../_mock/tickets'
// redux 
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTickets } from '../redux/tickets/ticketAction';
  
    
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const {account} = useSelector(state => state.user);
  const {ticketsList} = useSelector(state => state.tickets)
  const dispatch = useDispatch()
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    if(Object.keys(account).length === 0 && account.constructor === Object) {return}
    dispatch(fetchAllTickets(account['_id']))
  }, [account])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Propuestas
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        { ticketsList && ticketsList.map((ticketPersonal) => (
            <TicketList tickets = {ticketPersonal} />
        ))}

        {/* <TicketList tickets = {ticketsList} /> */}
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
 }

