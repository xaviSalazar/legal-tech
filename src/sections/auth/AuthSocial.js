// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const responseFacebook = (response) => {
    console.log(response);
  }

  // const responseGoogle = (response) => {
  //   console.log(response);
  // }
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FacebookLogin
          textButton="INGRESA CON FACEBOOK"
          appId="1713658689034375" //APP ID NOT CREATED YET
          fields="name,email,picture"
          callback={responseFacebook}
        />

        {/* <GoogleLogin
          clientId="739497935634-lqeff7f2654mbakdlrhv5inrhg4taons.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
          buttonText="INGRESA CON GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        /> */}
        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
        </Button> */}

        {/* <Button fullWidth size="large" color="inherit" variant="outlined">
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
        </Button> */}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
