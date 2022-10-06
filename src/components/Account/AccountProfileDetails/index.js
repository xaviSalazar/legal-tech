import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import { provinciasList } from '../../../constants';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];




function getStyles(name, personName, theme) {
  return {
    fontWeight:
    personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function MultipleSelectChip(personName, setPersonName) {

  // const names = [
  //   'Oliver Hansen',
  //   'Van Henry',
  //   'April Tucker',
  //   'Ralph Hubbard',
  //   'Omar Alexander',
  //   'Carlos Abbott',
  //   'Miriam Wagner',
  //   'Bradley Wilkerson',
  //   'Virginia Andrews',
  //   'Kelly Snyder',
  // ];

  const names = [
    "Derecho Administrativo",
    "Derecho Penal",
    "Derecho Constitucional",
    "Derecho Procesal",
    "Derecho Ambiental",
    "Derecho Laboral",
    "Derecho Civil",
    "Derecho de Familia",
    "Derecho Tributario",
    "Transito",
    "Derecho Coorporativo",
    "Derecho Sucesorio",
    "Derecho Mercantil",
    "Derecho Internacional Privado",
    "Derecho Internacional Publico" 
    ]

  const theme = useTheme();
  // const [especialidad, setEspecialidad] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-chip-label">Elige 3 especialidades</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Elige 3 especialidades" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    
  );
}

export const AccountProfileDetails = (props) => {

  const [provincia, setProvincia] = useState('');
  const [personName, setPersonName] = useState([]);

  // valores que deben venir de la base de datos
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    province: '',
    Ciudad: 'USA',
    Descripcion: '',
  });

  const handleProvinciaClearClick = () => {
    setProvincia('')
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <FormControl
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="Esta informacion es editable"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Por favor ingresa tu nombre"
                label="Nombre"
                name="Nombre"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
            { MultipleSelectChip(personName,setPersonName)}
            </Grid>
            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid> */}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Correo Electronico"
                name="email"
                disabled = {true}
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Numero Celular"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Ciudad"
                name="Ciudad"
                onChange={handleChange}
                required
                value={values.Ciudad}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <TextField
                fullWidth
                label="Elige una provincia"
                name="province"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.province}
                variant="outlined"
              >
                {provinciasList.map((option, index) => (
                  <option
                    key={index}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
                <TextField
                  id="outlinednumber"
                  label="Costo por primera consulta"
                  type="number"
                  InputProps={{
                    startAdornment:
                    <InputAdornment position="start">$</InputAdornment>,
                    shrink: true,
                  }}
                //   InputLabelProps={{
                //     shrink: true,
                //   }}
                />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Cuentanos sobre ti"
                name="Descripcion"
                onChange={handleChange}
                multiline={true}
                required
                value={values.Descripcion}
                variant="outlined"     
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </FormControl>
  );
};
