import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';
import CardHeader from '@mui/material/CardHeader';
// import { httpManager } from '../../../managers/httpManager';
import { modifyTicket } from '../../../redux/tickets/ticketAction';
// redux 
import {  useDispatch } from 'react-redux';
import { httpManager } from '../../../managers/httpManager';


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
const actionButtons = (handleClick, status, handleChange, hiddenFileInput, handleUpload, handleUploadDocument, file) => {

  if(status === "Acceptado") {
    return (
      <>
      <Typography variant="subtitle2" noWrap>
      Procese la solicitud.
      </Typography> 
      <Typography variant="subtitle2" noWrap>
      Paso 1. Descargue el documento
      </Typography> 
      <Typography variant="subtitle2" noWrap>
      Paso 2. Firme electronicamente
      </Typography> 
      <Typography variant="subtitle2" noWrap>
      Paso 3. Genere un PDF 
      </Typography> 
      <Typography variant="subtitle2" noWrap>
      Paso 4. subir el archivo y enviar
      </Typography> 
      {file &&  <Typography variant="subtitle2" noWrap>
      {file.name}
      </Typography> 
      }
      {file && <Button
          color="primary"
          variant="contained"
          onClick={handleUploadDocument}
        > 
        Enviar a cliente
        </Button>}
      <input 
          type="file" 
          ref={hiddenFileInput}
          style={{display:'none'}}
          accept="application/pdf"
          onChange={handleChange}     
      />
      <Button
          color="primary"
          variant="contained"
          onClick={handleUpload}
        > 
        Subir archivo
        </Button>
  </>
    )
  }
  else if(status === "Rechazado") {
    return (
      <Typography variant="subtitle2" noWrap>
          ****Solicitud rechazada****
      </Typography>)
  }
  else if(status === "Esperando respuesta") {
  return (
  <>
  <Button name="Acceptado" onClick={handleClick} variant="contained">Aceptar</Button>
  <Button name="Rechazado" onClick={handleClick} variant="contained">Rechazar</Button>
  </>
  )
} else {
  return (<></>)
}
}


export default function TicketCard({ ticket, ticketUsers}) {

  console.log(ticket)
  console.log(ticketUsers)

  const dispatch = useDispatch()
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState()

  const handleUploadDocument = async (event) => {
    const keepName = ticket['document'].replace('https://d1d5i0xjsb5dtw.cloudfront.net/','')
    const promise = new Promise ( async (resolve, reject) => {
      const {data} = await httpManager.getPresignedUrl(keepName)   
    const pipe = {
        bucket: "myawsbucketwhatsapp",
        ...data.fields,
        'Content-Type':file.type ,
        file: file
    };
    const formData = new FormData();
    for (const name in pipe) {
        formData.append(name, pipe[name]);
    }
    const {status} = await httpManager.uploadFileFromBrowser(data.url, formData)
    console.log(status)
    if(status === 204) { 
      // await httpManager.updateProfilePicture({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": account._id})
      // resolve({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": account._id})
      resolve({ticketId: ticket['ticketId'], status: "ENVIADO"}) 
    } else {reject("error loading to S3")} 
});

promise.then((d) => {
    console.log(d)
    dispatch(modifyTicket(d))
  });
}

const handleClick = async(event) => {
  const {name} = event.target
  const updateTicket = {ticketId: ticket['ticketId'], status: name}
  dispatch(modifyTicket(updateTicket))
}

const handleUpload = event => {
  hiddenFileInput.current.click();
};

const handleChange = async (event) => {
  const file = event.target.files[0];
  setFile(file)
  console.log(file)
  // if(file && file.type.substr(0,5) === "image") {
  //   setImage(file);
  // } else {
  //   setImage(null)
  // }
};

  return (
    <Card>
        <CardHeader 
            title = {`Cliente: ${ticketUsers[1]['name']}`}
            subheader = {new Date(ticket['createdAt']).toDateString()}
        />
      <Stack spacing={2} sx={{ p: 3 }}>

          <Typography variant="subtitle2" noWrap>
            {ticket['ticketId']}
          </Typography>
      
          {/* <Typography variant="subtitle2" noWrap>
            {ticket['document']}
          </Typography>
         */}
        
          <Typography variant="subtitle2" noWrap>
            {`Tema: ${ticket['subject']}`}
          </Typography>
        
        
          <Typography variant="subtitle2" noWrap>
            {`Estado: ${ticket['status']}`}
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
      <CardActions>
      <Stack direction="column" spacing={0} sx={{ p: 1 }}>
        <Link href={ticket['document']} underline="hover">
          VER DOCUMENTO
        </Link>
        {/* <Button size="small">VER DOCUMENTO</Button> */}
        <Stack direction="column" spacing={2} sx={{ p: 1 }}>
        {actionButtons(e => handleClick(e), 
                        ticket['status'], 
                        handleChange, 
                        hiddenFileInput, 
                        handleUpload,
                        handleUploadDocument,
                        file)}
        {/* <Button name="Acceptado" onClick={e => handleClick(e)} variant="contained">Aceptar</Button>
        <Button name="Rechazado" onClick={e => handleClick(e)} variant="contained">Rechazar</Button> */}
        </Stack>
      </Stack>
      </CardActions>
    </Card>
  );


}

// export default function TicketCard({ ticket, users}) {

//   const dispatch = useDispatch()
//   const hiddenFileInput = useRef(null);
//   const [file, setFile] = useState()

//   const { ticketUsers, ticketsTransactions } = ticket;

//   const handleUploadDocument = async (event) => {
//     const keepName = ticketsTransactions[0]['document'].replace('https://d1d5i0xjsb5dtw.cloudfront.net/','')
//     const promise = new Promise ( async (resolve, reject) => {
//       const {data} = await httpManager.getPresignedUrl(keepName)   
//     const pipe = {
//         bucket: "myawsbucketwhatsapp",
//         ...data.fields,
//         'Content-Type':file.type ,
//         file: file
//     };
//     const formData = new FormData();
//     for (const name in pipe) {
//         formData.append(name, pipe[name]);
//     }
//     const {status} = await httpManager.uploadFileFromBrowser(data.url, formData)
//     console.log(status)
//     if(status === 204) { 
//       // await httpManager.updateProfilePicture({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": account._id})
//       // resolve({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": account._id})
//       resolve({ticketId: ticketsTransactions[0]['ticketId'], status: "ENVIADO"}) 
//     } else {reject("error loading to S3")} 
// });

// promise.then((d) => {
//     console.log(d)
//     dispatch(modifyTicket(d))
//   });
// }

// const handleClick = async(event) => {
//   const {name} = event.target
//   const updateTicket = {ticketId: ticketsTransactions[0]['ticketId'], status: name}
//   dispatch(modifyTicket(updateTicket))
// }

// const handleUpload = event => {
//   hiddenFileInput.current.click();
// };

// const handleChange = async (event) => {
//   const file = event.target.files[0];
//   setFile(file)
//   console.log(file)
//   // if(file && file.type.substr(0,5) === "image") {
//   //   setImage(file);
//   // } else {
//   //   setImage(null)
//   // }
// };

//   return (
//     <Card>
//         <CardHeader 
//             title = {`Cliente: ${ticketUsers[1]['name']}`}
//             subheader = {new Date(ticketsTransactions[0]['createdAt']).toDateString()}
//         />
//       <Stack spacing={2} sx={{ p: 3 }}>

//           <Typography variant="subtitle2" noWrap>
//             {ticketsTransactions[0]['ticketId']}
//           </Typography>
      
//           {/* <Typography variant="subtitle2" noWrap>
//             {ticketsTransactions[0]['document']}
//           </Typography>
//          */}
        
//           <Typography variant="subtitle2" noWrap>
//             {`Tema: ${ticketsTransactions[0]['subject']}`}
//           </Typography>
        
        
//           <Typography variant="subtitle2" noWrap>
//             {`Estado: ${ticketsTransactions[0]['status']}`}
//           </Typography>
      
//         {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
//           <ColorPreview colors={colors} />
//           <Typography variant="subtitle1">
//             <Typography
//               component="span"
//               variant="body1"
//               sx={{
//                 color: 'text.disabled',
//                 textDecoration: 'line-through',
//               }}
//             >
//               {priceSale && fCurrency(priceSale)}
//             </Typography>
//             &nbsp;
//             {fCurrency(price)}
//           </Typography>
//         </Stack> */}
//       </Stack>
//       <CardActions>
//       <Stack direction="column" spacing={0} sx={{ p: 1 }}>
//         <Link href={ticketsTransactions[0]['document']} underline="hover">
//           VER DOCUMENTO
//         </Link>
//         {/* <Button size="small">VER DOCUMENTO</Button> */}
//         <Stack direction="column" spacing={2} sx={{ p: 1 }}>
//         {actionButtons(e => handleClick(e), 
//                         ticketsTransactions[0]['status'], 
//                         handleChange, 
//                         hiddenFileInput, 
//                         handleUpload,
//                         handleUploadDocument,
//                         file)}
//         {/* <Button name="Acceptado" onClick={e => handleClick(e)} variant="contained">Aceptar</Button>
//         <Button name="Rechazado" onClick={e => handleClick(e)} variant="contained">Rechazar</Button> */}
//         </Stack>
//       </Stack>
//       </CardActions>
//     </Card>
//   );
// }
