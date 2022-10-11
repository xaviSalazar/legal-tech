import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button
} from '@mui/material';

export const TemplatesListTable = ({ ...rest }) => {

    const docList =[
      {
        id: 1,
        name: 'Autorizacion_ejemplo',
        category: 'Derecho Civil'
      },
      {
        id: 2,
        name: 'Acta de desarrollo',
        category: 'Derecho Civil'
      },
      {
        id: 3,
        name: 'Notaria pdf',
        category: 'Derecho Civil'
      }
    ]

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);


    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
    
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };



return (
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
                    <ModeEditOutlineOutlinedIcon/>
                    <VisibilityOutlinedIcon />
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
    </Card>
)


};