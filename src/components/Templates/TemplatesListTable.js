import { useState, useEffect, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
////// docxtemplater
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
// httpManager
import { httpManager } from '../../managers/httpManager';
//-----------------------product template viewer
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Container, Typography } from '@mui/material';
//
import uuid from 'react-uuid';
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


const handleUpdateGeneratedS3 = async (file_, setVisualiseDocument) => {

  const original_uuid = uuid()
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

const generateDocument = async (document, champsToFill, setVisualiseDocument) => {
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
        // console.log(JSON.stringify({ error: error }, replaceErrors));

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
      handleUpdateGeneratedS3(out, setVisualiseDocument)
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


export const TemplatesListTable = ({...rest }) => {


  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [singleDocument, setSingleDocument] = useState([])
  const [visualiseDocument, setVisualiseDocument] = useState([])
  const [champsToFill, setChampsToFill] = useState({})
  const [example, setExample] = useState({})
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
    setSingleDocument(doc)
  };

  const handleClickAway = () => {
    setOpen(false);
  };

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

  const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
    
  const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const [selectedDocs, setSelectedDocs] = useState([]);

return (  
  <ClickAwayListener onClickAway={handleClickAway}>

{open ? (
          <Box sx={styles}>
            {singleDocument[0] && champsToFillbyUser}
            <Button 
                variant="contained" 
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={e => generateDocument(visualiseDocument, champsToFill, setVisualiseDocument)}
            >
              Generar documento
            </Button>     
            {wordDoc}
            {/* <DocumentViewer docs = {visualiseDocument} /> */}
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