
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField, Container, Grid} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { httpManager } from '../../../managers/httpManager';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { provinciasList } from '../../../constants';
import moment from 'moment';
import HelperRegisterForm from './HelperRegisterForm';
import { registerObject } from '../../../constants';


// ----------------------------------------------------------------------

export default function RegisterForm() {

    const navigate = useNavigate();
    const [birth, setBirth] = useState(dayjs(''));
    const [option, setOption] = useState('');
    const [checked, setChecked] = useState(false)
    const [values, setValues] = useState(registerObject)
    const [materia, setMateria] = useState([]);

    useEffect( () => {
       
      const tokens = localStorage.getItem("register_data")
      if(tokens) {
          const item = JSON.parse(tokens);
          setValues({...values, ['name']: item.name, ['email']: item.email, ['image_url']: item.image})
      }

  },[])

  console.log(values)

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

    const handlePhoneChange = (newPhoneNumber) => {
      const firstFilter = newPhoneNumber.replace('+','')
      const newoutput = firstFilter.replace(/ /g , '')
      setValues({...values, ['phoneNumber']:newoutput})
    }
    
    const handleChangeDate = (newValue) => {
      setBirth(newValue);
      setValues({...values, ['birthDate']: Date.parse(newValue)})
    };


    const handleChangeSelect = (event) => {
        setOption(event.target.value);
        // change values 
        setValues({
            ...values, ['userMod']: event.target.value,
          })
    };

    const handleWorkSelect = (event) => {
      // console.log(event.target.checked)
      setChecked(event.target.checked)
      setValues({
        ...values,
        [event.target.name]: event.target.checked
      })
    }

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };


    const handleAddFormSubmit = async (e) => {

        e.preventDefault()
        const contactBackend = await httpManager.registerCustomer(values)
        if(contactBackend['data']['responseCode'] === 200) {
          // succesfully registered go to login page
          const token = contactBackend['data']['responseData']['token']
          localStorage.setItem('customerToken', token)
          if(contactBackend['data']['responseData']['ClienteExist']['userMod'] === "Abogado") {
            console.log(`GO TO ABOGADO PAGE`)
            navigate('/abogado-page')
          } else if(contactBackend['data']['responseData']['ClienteExist']['userMod'] === "Cliente") {
            console.log(`GO TO CLIENTE PAGE`)
            navigate('/cliente-page')
          }
    
      } else {
        // user is not logged in 
      }

    } 

  return (

    <Container maxWidth="sm">
    <Card>
    <CardHeader
      subheader="Selecciona si eres cliente o abogado"
      title="REGISTRO DE USUARIO"
    />        
    <Divider />
    <CardContent>
    <form className='contact-form' onSubmit={handleAddFormSubmit}>
    
    <Stack spacing={3}>
   
        <Avatar variant={"rounded"} alt="The image" src={values.image_url} style={{
                width: 50,
                height: 50,
            }} />

         <Grid
            container
            spacing={2}
          >

            {/* NOMBRE */}  
         <Grid
              item
              md={6}
              xs={12}
            >
        <TextField 
        label="Nombre y Apellidos"
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

        {/* EMAIL */}
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
              md={12}
              xs={12}
            >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          name = "birthDate"
          label="Fecha de nacimiento"
          inputFormat="DD/MM/YYYY"
          value={birth}
          onChange={handleChangeDate}
          minDate = {moment().subtract(90,"years")}
          maxDate = {moment().subtract(18, "years")}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
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

        {/* ELECCION CLIENTE O ABOGADO */}
        <Grid
              item
              md={12}
              xs={12}
            >
         <InputLabel id="demo-simple-select-label">Elige tipo de usuario</InputLabel>
         </Grid>
         <Grid
              item
              md={12}
              xs={12}
          >
         <Select   
          required
          id="demo-simple-select"
          value={option}
          label="Elige tipo de usuario"
          onChange={handleChangeSelect}
        >
          <MenuItem value={"Abogado"}>{"Abogado"}</MenuItem>
          <MenuItem value={"Cliente"}>{"Cliente"}</MenuItem>
        </Select>
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

        <Divider />
        {/* BUTTON TO REGISTER DATA IN BACKEND */}
        <Grid
          item
          md={12}
          xs={12}
          >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            p: 2
          }}
        >
        <Button 
            color="primary"
            variant="contained" 
            type="submit">Registrarse
        </Button>
        </Box>
        </Grid>
    </Grid>
    </Stack>
    
    </form>
    </CardContent>
    </Card>
    </Container>

  );
}
