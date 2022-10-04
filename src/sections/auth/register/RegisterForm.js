import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { httpManager } from '../../../managers/httpManager';

// ----------------------------------------------------------------------

export default function RegisterForm() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ name: '',
  email: '',
  password: '',
  userMod: ''})

  const handleChangeSelect = (event) => {
       setFormValues({...formValues, ['userMod']:event.target.value})
     };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event) => {

    event.preventDefault();
    // navigate('/dashboard', { replace: true });
    console.log(formValues)

    const contactBackend = await httpManager.ownRegisterCustomer({name: formValues.name, 
                                                                  email: formValues.email, 
                                                                  userMod: formValues.userMod, 
                                                                  password: formValues.password })
    if(contactBackend['data']['responseCode'] === 200){
      // succesfully registered go to login page
      navigate("/login") 
  } else {

      // error not registered 
  }

  };

  const handleChange = (event) => {
   
   const {value, name} = event.target
   setFormValues({...formValues, [name]:value})

  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField required name="name" label="Nombre y Apellido" value = {formValues["name"]} onChange = {handleChange}/>
        </Stack>

        <RHFTextField required name="email" label="Correo Electronico" value = {formValues["email"]} onChange = {handleChange} />

        <RHFTextField
          name="password"
          label="Contrasena"
          required
          type={showPassword ? 'text' : 'password'}
          value = {formValues["password"]} 
          onChange = {handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <InputLabel id="demo-simple-select-label">Elige si eres cliente o abogado</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          required
          id="demo-simple-select"
          value={formValues['userMod']}
          label="Abogado o cliente"
          onChange={handleChangeSelect}
        >
          <MenuItem value={"Abogado"}>Abogado</MenuItem>
          <MenuItem value={"Cliente"}>Cliente</MenuItem>
        </Select>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Registrate
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
