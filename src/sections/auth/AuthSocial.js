// material
import { Stack, Button, Divider, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

import FacebookLogin from 'react-facebook-login';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

import { httpManager } from '../../managers/httpManager';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AuthSocial() {

  const navigate = useNavigate();

  const clientId = '739497935634-lqeff7f2654mbakdlrhv5inrhg4taons.apps.googleusercontent.com';

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
  });

  const responseFacebook = async (response) => {

    console.log(response);
    const contactBackend = 
          await httpManager.facebookLogin({accessToken: response.accessToken,
                                           userID: response.userID})
      console.log(contactBackend)
      if(contactBackend['data']['responseCode'] === 400) {
        if(contactBackend['data']['message'].toLowerCase().trim() === "Wrong password login failed".toLowerCase().trim())
        {
          alert("Login Invalido! No hubo creacion de cuenta por Facebook login ni Google login, ingrese su contrasenia")
          return
        }
        localStorage.setItem("register_data", JSON.stringify({name: response.name, email: response.email, image: response['picture']['data']['url']}))
        console.log(`USER IS NOT REGISTERED`)
        navigate('/register-social-form');
      } else if(contactBackend['data']['responseCode'] === 200) {
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

  }

  }

  const onSuccess = async (res) => {
    console.log('success:', res);
    const contactBackend =
        await httpManager.googleLogin({name: res['profileObj']['name'], email: res['profileObj']['email']})
        console.log(contactBackend)
        if(contactBackend['data']['responseCode'] === 400) {
          localStorage.setItem("register_data", JSON.stringify({name: res['profileObj']['name'], email: res['profileObj']['email'], image: res['profileObj']['imageUrl']}))
          console.log(`USER IS NOT REGISTERED`)
          navigate('/register-social-form');
        } else if(contactBackend['data']['responseCode'] === 200) {
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
    
      }
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };

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

       <GoogleLogin
          clientId={clientId}
          buttonText="INGRESA CON GOOGLE"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />

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
