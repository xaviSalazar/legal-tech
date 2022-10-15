import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';
import CardHeader from '@mui/material/CardHeader';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

TicketCard.propTypes = {
  ticket: PropTypes.object,
};


// {
//     "_id": "634964b0ceaa3326544d6c82",
//     "ticketUsers": [
//         {
//             "name": "Xavier Salazar",
//             "email": "xavicoel@gmail.com",
//             "phoneNumber": "593969044674",
//             "userId": "63429af1aa0463dd340c1637",
//             "_id": "634964b0ceaa3326544d6c83"
//         },
//         {
//             "name": "Xavier Salazar",
//             "email": "xavicoel@hotmail.com",
//             "phoneNumber": "",
//             "userId": "634598719671714053a41e4d",
//             "_id": "634964b0ceaa3326544d6c84"
//         }
//     ],
//     "ticketsTransactions": [
//         {
//             "ticketId": "5553d16-18e3-eca-5a74-78254eaa87c",
//             "document": "https://d1d5i0xjsb5dtw.cloudfront.net/5553d16-18e3-eca-5a74-78254eaa87c/documento_prueba.docx",
//             "subject": "Documento a firmar",
//             "createdAt": "2022-10-14T13:31:09.556Z",
//             "status": "Esperando respuesta",
//             "_id": "634964b0ceaa3326544d6c85"
//         }
//     ],
//     "conversation": [],
//     "__v": 0
// },

export default function TicketCard({ ticket }) {
  const { ticketUsers, ticketsTransactions } = ticket;

  return (
    <Card>
        <CardHeader 
            title = {`Cliente: ${ticketUsers[1]['name']}`}
            subheader = {new Date(ticketsTransactions[0]['createdAt']).toDateString()}
        />
      <Stack spacing={2} sx={{ p: 3 }}>

          <Typography variant="subtitle2" noWrap>
            {ticketsTransactions[0]['ticketId']}
          </Typography>
      
        
          <Typography variant="subtitle2" noWrap>
            {ticketsTransactions[0]['document']}
          </Typography>
        
        
          <Typography variant="subtitle2" noWrap>
            {`Tema: ${ticketsTransactions[0]['subject']}`}
          </Typography>
        
        
          <Typography variant="subtitle2" noWrap>
            {`Estado: ${ticketsTransactions[0]['status']}`}
          </Typography>
       

        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
