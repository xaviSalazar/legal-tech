import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { httpManager } from '../../../managers/httpManager';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../../../redux/login/loginAction';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.login)
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ 
                                                email: '',
                                                password: '',
                                                userMod: ''})
  // useEffect(() => {
  //   if(userType === "Abogado") {
  //     navigate('/abogado-page')
  //   } else if(userType === "Cliente"){
  //     navigate('/cliente-page')
  //   }
  // }, [isAuth])

  const handleChangeSelect = (event) => {
       setFormValues({...formValues, ['userMod']:event.target.value})
     };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (event) => {

    event.preventDefault();

  dispatch(doLogin( {email: formValues.email, userMod: formValues.userMod, password: formValues.password }))

  };

  const handleChange = (event) => {
   
    const {value, name} = event.target
    setFormValues({...formValues, [name]:value})
 
   }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        <RHFTextField required name="email" label="Correo Electronico" value = {formValues["email"]} onChange = {handleChange} />

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

        <RHFTextField
          name="password"
          label="Password"
          required
          value = {formValues["password"]} 
          onChange = {handleChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      { isLoading ?<CircularProgress/> : (
      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      )}
    </FormProvider>
  );
}
