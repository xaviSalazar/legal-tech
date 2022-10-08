import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { httpManager } from '../../../managers/httpManager';

//constants
import { provinciasList } from '../../../constants';


//PICK TIME
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';

// helpers
import HelperRegisterForm from './HelperRegisterForm';

import { registerObject } from '../../../constants';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [birth, setBirth] = useState(dayjs(''));
  const [checked, setChecked] = useState(false)
  const [formValues, setFormValues] = useState(registerObject)
  const [materia, setMateria] = useState([]);

 console.log(formValues)

  const handleChangeEspecialidad = (event) => {

    const {
        target: { value },
    } = event;

    if(value.length <= 3) {
    setMateria(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
    setFormValues({...formValues, ['subjects']: typeof value === 'string' ? value.split(',') : value})
    }};
  


  const handleChangeDate = (newValue) => {
      setBirth(newValue);
      setFormValues({...formValues, ['birthDate']: Date.parse(newValue)})
    };

    const handlePhoneChange = (newPhoneNumber) => {
      const firstFilter = newPhoneNumber.replace('+','')
      const newoutput = firstFilter.replace(/ /g , '')
      setFormValues({...formValues, ['phoneNumber']:newoutput})
    }

  const handleChangeSelect = (event) => {
       setFormValues({...formValues, ['userMod']:event.target.value})
     };

  const handleWorkSelect = (event) => {
      // console.log(event.target.checked)
      setChecked(event.target.checked)
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.checked
      })
    }

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

    const contactBackend = await httpManager.ownRegisterCustomer(formValues)
    if(contactBackend['data']['responseCode'] === 200){
      // succesfully registered go to login page
      navigate("/login") 
  } else {

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

        <RHFTextField
                label="Ciudad"
                name="city"
                onChange={handleChange}
                required
                value={formValues['city']}
        />

        <TextField
                 label="Elige una provincia"
                 name="province"
                 onChange={handleChange}
                 required
                 select
                 SelectProps={{ native: true }}
                 value={formValues['province']}
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

        <HelperRegisterForm 
              handleChange={handleChange} 
              handleWorkSelect={handleWorkSelect} 
              handlePhoneChange={handlePhoneChange}
              values={formValues}
              checked={checked}
              handleChangeEspecialidad={handleChangeEspecialidad}
              materia={materia}
              setMateria={setMateria}/>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Registrate
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
