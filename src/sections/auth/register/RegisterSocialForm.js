
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import { httpManager } from '../../../managers/httpManager';
import FormLabel from '@mui/material/FormLabel';



// ----------------------------------------------------------------------

export default function RegisterForm() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [initName, setInitName] = useState('')
    const [initEmail, setInitEmail] = useState('')
    const [values, setValues] = useState({
        name: '',
        email: '',
        image_url: ''
      });
    const [isDisabled, setIsDisabled] = useState({name: false, email: true});
    const [option, setOption] = useState('');

    const handleChangeSelect = (event) => {
        setOption(event.target.value);
    };


    useEffect( () => {
       
        const tokens = localStorage.getItem("register_data")
        if(tokens) {
            const item = JSON.parse(tokens);
            setValues({
                name: item.name,
                email: item.email,
                image_url: item.image
            })
        }

    },[])

    const handleChange = (event) => {
        setValues({
          ...values,
          [event.target.name]: event.target.value
        });
      };


    const handleAddFormSubmit = async (e) => {

        e.preventDefault()
        const contactBackend = await httpManager.registerCustomer({name: values.name, email: values.email, userMod: option })
        if(contactBackend['data']['responseCode'] === 200) {
          // succesfully registered go to login page
          const token = contactBackend['data']['responseData']['token']
          localStorage.setItem('customerToken', token)
          if(contactBackend['data']['responseData']['ClienteExist']['userMod'] === "Abogado") {
            console.log(`GO TO ABOGADO PAGE`)
          } else if(contactBackend['data']['responseData']['ClienteExist']['userMod'] === "Cliente") {
            console.log(`GO TO CLIENTE PAGE`)
          }
    
      } else {
        // user is not logged in 
      }

    } 

  return (

    <Card>
    <CardHeader
      subheader="Selecciona si eres cliente o abogado"
      title="REGISTRO DE USUARIO"
    />        
    <Divider />
    <CardContent>
    <form className='contact-form' onSubmit={handleAddFormSubmit}>
        <Avatar variant={"rounded"} alt="The image" src={values.image_url} style={{
                width: 50,
                height: 50,
            }} />
        <TextField 
        label="Nombre"
        margin="normal"
        name="name"
        type="text"
        required
        onChange={handleChange}
        disabled={isDisabled.name}
        value={values.name}
        variant="outlined"
        />
        <br/> 
         <TextField 
          label="Email"
          margin="normal"
          name="email"
          type="text"
          onChange={handleChange}
          disabled={isDisabled.email}
          value={values.email}
          variant="outlined"
          />
        <Divider />

         <InputLabel id="demo-simple-select-label">Elige si eres cliente o abogado</InputLabel>
         <Select
          labelId="demo-simple-select-label"
          required
          id="demo-simple-select"
          value={option}
          label="Abogado o cliente"
          onChange={handleChangeSelect}
        >
          <MenuItem value={"Abogado"}>Abogado</MenuItem>
          <MenuItem value={"Cliente"}>Cliente</MenuItem>
        </Select>

        <br/> 
        <br/> 
        <Divider />

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
    </form>
    </CardContent>
    </Card>

  );
}
