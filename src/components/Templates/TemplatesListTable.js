import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
////// docxtemplater
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
// import { saveAs } from 'file-saver';
// httpManager
import { httpManager } from '../../managers/httpManager';
// redux 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//-----------------------product template viewer
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
// import { Container, Typography } from '@mui/material';
// google forms 
import uuid from 'react-uuid';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import SearcherAbogado from '../SearcherAbogado';

const docList =[
  {
    id: 1,
    name: 'Autorizacion_ejemplo',
    category: 'Derecho Civil',
    uri: 'https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION_example.docx',
    campos: ['nombres_completos', 'cedula',
    'nacionalidad', 'estado_civil',
     'domicilio', 'telefono', 
     'correo_electronico', 'persona_poder',
    'persona_recibe_poder', 'cedula_poder', 
    'estado_civil_poder','numero_celular']
  },
  // {
  //   id: 2,
  //   name: 'Acta de desarrollo',
  //   category: 'Derecho Civil',
  //   uri: 'https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION_ejemplo+.docx',
  //   campos: ['nombres_completos', 
  //   'nacionalidad', 'estado_civil',
  //    'domicilio', 'telefono', 
  //    'correo_electronico', 'persona_poder',
  //   'persona_recibe_poder', 'cedula_poder', 
  //   'estado_civil_poder','numero_celular']
  // },
  // {
  //   id: 3,
  //   name: 'Notaria pdf',
  //   category: 'Derecho Civil',
  //   uri: 'https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION_ejemplo+.docx',
  //   campos: ['nombres_completos', 
  //   'nacionalidad', 'estado_civil',
  //    'domicilio', 'telefono', 
  //    'correo_electronico', 'persona_poder',
  //   'persona_recibe_poder', 'cedula_poder', 
  //   'estado_civil_poder','numero_celular']
  // }
]

// const styles = {
//   top: 28,
//   right: 0,
//   left: 0,
//   zIndex: 1,
//   p: 1,
//   bgcolor: 'background.paper',
// };


const handleUpdateGeneratedS3 = async (file_, setVisualiseDocument, setTicketNumber) => {

  console.log(`upload to S3`)

  const original_uuid = uuid()
  setTicketNumber(original_uuid)
  const promise = new Promise ( async (resolve, reject) => {
  const {data} = await httpManager.getPresignedUrl(`${original_uuid}/documento_prueba.docx`)   
  const pipe = {
      bucket: "myawsbucketwhatsapp",
      ...data.fields,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      file: file_
  };
  const formData = new FormData();
  for (const name in pipe) {
      formData.append(name, pipe[name]);
  }
  const {status} = await httpManager.uploadFileFromBrowser(data.url, formData)
  if(status === 204) { 
    resolve([{"uri": `https://d1d5i0xjsb5dtw.cloudfront.net/${original_uuid}/documento_prueba.docx`}])
  //   await httpManager.updateProfilePicture({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": values._id})
  //   resolve({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": values._id}) 
  } else {reject("error loading to S3")} 

});

promise.then((d) => {
  console.log(d)
  setVisualiseDocument(d)
});

}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const generateDocument = async (document, champsToFill, setVisualiseDocument, setTicketNumber) => {
  loadFile(
    // 'https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION+MODIFICABLE+.docx',
    document[0]['uri'],
    function (error, content) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      // REPLACE DATA WITH JSON
      doc.setData(champsToFill);
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join('\n');
          console.log('errorMessages', errorMessages);
          // errorMessages is a humanly readable message looking like this :
          // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
      }
      var out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }); //Output the document using Data-URI
      handleUpdateGeneratedS3(out, setVisualiseDocument, setTicketNumber)
    }
  );
};


const DocumentViewer = ({docs}) => {

  // const docs = [{ uri: "https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION+MODIFICABLE+.docx"}];

  return (
            <DocViewer  
                pluginRenderers={DocViewerRenderers}
                documents={docs} 
                style={{ height: 700 }}
            />
          )
}


export const TemplatesListTable = ({...rest }) => {

  const {account} = useSelector(state => state.user)
  const [list, setList] = useState([]);
  const [ticketNumber, setTicketNumber] = useState('')
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [singleDocument, setSingleDocument] = useState([])
  const [visualiseDocument, setVisualiseDocument] = useState([])
  const [editableDoc, setEditableDoc] =  useState([])
  const [champsToFill, setChampsToFill] = useState({})
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();


 

  const wordDoc = useMemo( () => <DocumentViewer docs = {visualiseDocument} />, [visualiseDocument])

  
  const handleClick = (e, id) => {
    setOpen((prev) => !prev);
    const doc = docList.filter(item => item.id === id)
    const campos_obj = doc[0].campos.reduce((accumulator, value) => {
      return {...accumulator, [value]: ''}
    }, {});
    const uri = doc.map(({uri}) => uri)
    setChampsToFill(campos_obj)
    setVisualiseDocument([{"uri": uri[0]}])
    setEditableDoc([{"uri": uri[0]}])
    setSingleDocument(doc)
  };

  // const handleClickAway = () => {
  //   setOpen(false);
  // };

  const handleChange = (e) => {
    setChampsToFill({...champsToFill, [e.target.name]: e.target.value})
  }

  const champsToFillbyUser = singleDocument[0] && singleDocument[0].campos.map(
      (item, index) => {
        return <TextField 
                  key={index} 
                  required
                  label={item} 
                  name={item}
                  value={champsToFill[item]}
                  onChange={e => handleChange(e)}
                />
      })

  const VerifyUserData = () => {
    let array = []
    for (const key in champsToFill){
       array.push(<TextField  
              label={key} 
              name={key}
              disabled={true}
              value={champsToFill[key]}
            />)
    }
    return array
  }

  const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
    
  const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

  const handleSubmit = async(event) => {
    event.preventDefault();
    generateDocument(editableDoc, champsToFill, setVisualiseDocument, setTicketNumber)
  }

  const handleBuy = async(event) => {
    if(list.length === 1) {
      // abogado
      const Abogado = {name:list[0]['name'], 
                       email:list[0]['email'], 
                       phoneNumber:list[0]['phoneNumber'],
                       userId: list[0]['_id'] }

      const Cliente = {name:account['name'], 
                       email:account['email'], 
                       phoneNumber:account['phoneNumber'],
                       userId: account['_id'] }

      const ticketTransaction = {
        ticketId: ticketNumber,
        document: visualiseDocument[0]['uri'],
        subject: `Documento a firmar`
      }

      const data = { Abogado: Abogado, Cliente: Cliente, ticketTransaction: ticketTransaction}
      const ticketCreation = await httpManager.createTicket(data);
      console.log(ticketCreation)
      if(ticketCreation['data']['responseCode'] === 200) {
        navigate('/cliente-page/propuestas')
        alert(ticketCreation['data']['message'])
      }
    }

  }

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

    // console.log(`visualizeDocument`)
    // console.log(visualiseDocument)
    // console.log(`champs to fill`)
    // console.log(champsToFill)

return (  
  // <ClickAwayListener onClickAway={handleClickAway}>
  <Box>
{open ? (
          // <Box sx={styles}>
          <Box>
          <Box>
          <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="PASO 1: Genera tu documento" />
          <Tab label="PASO 2: Elige tu abogado" />
          <Tab label="PASO 3: Verifica y envia" />
          </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
          <Box>
           <Card>
           <IconButton onClick={() => setOpen((prev) => !prev)} ><CloseIcon/></IconButton>
               <CardContent>
             <Grid container spacing={2}>
             <Grid item xs={4}>    
             {singleDocument[0] &&  <form onSubmit={handleSubmit}>
                                      <Stack spacing={1}>
                                       {champsToFillbyUser}
                                       <Button
                                       variant="contained" 
                                       type="submit"
                                       startIcon={<ModeEditOutlineOutlinedIcon />}
                                       >
                                         Generar documento
                                       </Button>
                                       </Stack>
                                     </form>}
             </Grid>  
             <Grid item xs={8}>
             {wordDoc}
             </Grid>
             </Grid>
             </CardContent>
             </Card>
          </Box>
          )}
          {tabIndex === 1 && (
          <Box>
            <SearcherAbogado list={list} setList={setList}/>
          </Box>
          )}
          {tabIndex === 2 && (
          <Box>
            <Typography>The third tab</Typography>
            <VerifyUserData />
            {list.length === 1 ? (<Typography>{`su abogado es: ${list[0]['name']}`}</Typography>): (<Typography>Seleccione abogado</Typography>) }
            <Button
              onClick={handleBuy}
              variant="contained" 
            >
              Enviar Documento 
            </Button>
          </Box>
          )}
          </Box>
          </Box>
          // <Box>
          // <Card>
          // <IconButton onClick={() => setOpen((prev) => !prev)} ><CloseIcon/></IconButton>
          //     <CardContent>
          //   <Grid container spacing={2}>
          //   <Grid item xs={4}>    
          //   {singleDocument[0] &&  <form onSubmit={handleSubmit}>
          //                             <Stack spacing={1}>
          //                             {champsToFillbyUser}
          //                             <Button
          //                             variant="contained" 
          //                             type="submit"
          //                             startIcon={<ModeEditOutlineOutlinedIcon />}
          //                             >
          //                               Generar documento
          //                             </Button>
          //                             <Button
          //                               onClick={handleBuy}
          //                               variant="contained" 
          //                             >
          //                               Comprar 
          //                             </Button>
          //                             </Stack>
          //                           </form>}
          //   </Grid>  
          //   <Grid item xs={8}>
          //   {wordDoc}
          //   </Grid>
          //   </Grid>
          //   </CardContent>
          //   </Card>
          // </Box>     
        ) : 
    <Card {...rest}>
        <PerfectScrollbar>
        <Box sx={{ flexFlow: '1', overflowX: "scroll",}}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>
                  Nombre de documento
                </TableCell> 
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell>
                  Nota
                </TableCell>
                <TableCell>
                  Acciones
                </TableCell>
                {/* <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Direccion
                </TableCell>
                <TableCell>
                  Lugar de Trabajo
                </TableCell>
                <TableCell>
                  Asunto
                </TableCell> 
                <TableCell>
                  Notas
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {docList.slice(page*limit, limit*(page+1)).map((document) => (
                <TableRow
                  hover
                  key={document.id}
                  // selected={selectedCustomerIds.indexOf(document._id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked = {selectedCustomerIds.map(document => document._id).indexOf(document._id) !== -1}
                      // checked={selectedCustomerIds.indexOf(document._id) !== -1}
                      onChange={(event) => handleSelectOne(event, document)}
                      value="true"
                    />
                  </TableCell> 
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={document.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(document.Nombres)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {`${document.Nombres} ${document.Apellidos}`}
                    </Typography> 
                    </Box>
                  </TableCell>*/}
                  <TableCell>
                    {document.name}
                  </TableCell>
                  <TableCell>
                    {document.category}
                  </TableCell>
                  <TableCell>
                    {`notas a agregar`}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                    {/* <IconButton >
                    <ModeEditOutlineOutlinedIcon/>
                    </IconButton> */}
                    <IconButton onClick={e => handleClick(e, document.id)}>
                    <VisibilityOutlinedIcon />
                    </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box> 
      </PerfectScrollbar>
        <TablePagination
        component="div"
        count={docList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>}
    </Box>
    //  </ClickAwayListener>
    
)


};