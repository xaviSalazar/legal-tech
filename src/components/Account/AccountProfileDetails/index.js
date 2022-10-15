import { useState, useEffect } from 'react';
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
import { httpManager } from '../../../managers/httpManager';
import FormControl from '@mui/material/FormControl';
import { registerObject } from '../../../constants';
import { provinciasList } from '../../../constants';
import HelperRegisterForm from '../../../sections/auth/register/HelperRegisterForm';
// redux 
import { useSelector } from 'react-redux';
import Account from '../../../pages/Account';


export const AccountProfileDetails = (props) => {

  const {account} = useSelector(state => state.user)
  const [values, setValues] = useState(registerObject)
  const [materia, setMateria] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
      setValues(account)
      setChecked(account['remoteWork'])
      setMateria(account['subjects'])
  }, [account])
  
  const handlePhoneChange = (newPhoneNumber) => {
    const firstFilter = newPhoneNumber.replace('+','')
    const newoutput = firstFilter.replace(/ /g , '')
    setValues({...values, ['phoneNumber']:newoutput})
  }

  const handleWorkSelect = (event) => {
    // console.log(event.target.checked)
    setChecked(event.target.checked)
    setValues({
      ...values,
      [event.target.name]: event.target.checked
    })
  }

  const handleChangeEspecialidad = (event) => {

    const {
        target: { value },
    } = event;

    if(value.length <= 3) {
    setMateria(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
    setValues({...values, ['subjects']: typeof value === 'string' ? value.split(',') : value})
    }};
 
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveDetails = async () =>{
    console.log(`enviar`)
    console.log(values)
    const backendResponse = await httpManager.updateAbogadoProfile(values)
    if(backendResponse['data']['responseCode'] === 200) {
      alert(`profile updated`)
    }

  }

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
              md={6}
              xs={12}
            >
              <TextField 
              label="Nombre y Apellidos"
              helperText="Nombre y apellido de tu carta de presentacion"
              margin="normal"
              name="name"
              type="text"
              required
              onChange={handleChange}
              disabled={false}
              value={values.name}
              variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField 
            label="Email"
            margin="normal"
            name="email"
            type="text"
            onChange={handleChange}
            disabled={true}
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
                label="Ciudad"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
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

            <HelperRegisterForm 
            handleChange={handleChange} 
            handleWorkSelect={handleWorkSelect}
            handlePhoneChange={handlePhoneChange}
            values={values} 
            checked={checked}
            handleChangeEspecialidad={handleChangeEspecialidad}
            materia={materia}
            setMateria={setMateria}
            />
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
            onClick={handleSaveDetails}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </FormControl>
  );
};
