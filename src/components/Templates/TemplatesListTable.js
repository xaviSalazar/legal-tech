import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
//-----------------------product template viewer
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Container, Typography } from '@mui/material';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField
} from '@mui/material';

const styles = {

  top: 28,
  right: 0,
  left: 0,
  zIndex: 1,
  p: 1,
  bgcolor: 'background.paper',
};

const EcommerceShop=() => {
  const docs = [
    { uri: "https://d1d5i0xjsb5dtw.cloudfront.net/AUTORIZACION+MODIFICABLE+.docx"} 
  ];

  return (
            <DocViewer  
                pluginRenderers={DocViewerRenderers}
                documents={docs} 
                style={{ height: 700 }}
            />
          )
}

const docList =[
  {
    id: 1,
    name: 'Autorizacion_ejemplo',
    category: 'Derecho Civil',
    campos: ['nombres_completos', 
    'nacionalidad', 'estado_civil',
     'domicilio', 'telefono', 
     'correo_electronico', 'persona_poder',
    'persona_recibe_poder', 'cedula_poder', 
    'estado_civil_poder','numero_celular']
  },
  {
    id: 2,
    name: 'Acta de desarrollo',
    category: 'Derecho Civil',
    campos: ['nombres_completos', 
    'nacionalidad', 'estado_civil',
     'domicilio', 'telefono', 
     'correo_electronico', 'persona_poder',
    'persona_recibe_poder', 'cedula_poder', 
    'estado_civil_poder','numero_celular']
  },
  {
    id: 3,
    name: 'Notaria pdf',
    category: 'Derecho Civil',
    campos: ['nombres_completos', 
    'nacionalidad', 'estado_civil',
     'domicilio', 'telefono', 
     'correo_electronico', 'persona_poder',
    'persona_recibe_poder', 'cedula_poder', 
    'estado_civil_poder','numero_celular']
  }
]


export const TemplatesListTable = ({ ...rest }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [singleDocument, setSingleDocument] = useState([])

  
  const handleClick = (e, id) => {
    setOpen((prev) => !prev);
    const doc = docList.filter(item => item.id === id )
    setSingleDocument(doc)
    console.log(doc)
    console.log(id)
  };

  const handleClickAway = () => {
    setOpen(false);
  };

 

    const champsToFillbyUser = singleDocument[0] && singleDocument[0].campos.map(
      (item, index) => {
        return <TextField key={index} required id="outlined-required" label={item} defaultValue=""/>
      })

   

    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
    
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };



return (
  <ClickAwayListener onClickAway={handleClickAway}>

{open ? (
          <Box sx={styles}>
            <Button variant="contained" startIcon={<ModeEditOutlineOutlinedIcon />}>
              Editar con mis datos
            </Button>
            {singleDocument[0] && champsToFillbyUser}
            <EcommerceShop />
            
          </Box>
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
     </ClickAwayListener>
    
)


};