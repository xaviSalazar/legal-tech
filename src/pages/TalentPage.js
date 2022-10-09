import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';
import TalentNavbar from '../components/TalentPage/NavBar'
import TalentSidebar from '../components/TalentPage/SiderBar';
import { httpManager } from '../managers/httpManager';

// ----------------------------------------------------------------------

// const ContentStyle = styled('div')(({ theme }) => ({
//   maxWidth: 480,
//   margin: 'auto',
//   minHeight: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   padding: theme.spacing(12, 0)
// }));

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function TalentPage() {

  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("")

  useEffect(() => {

    console.log(`Talent page useEffect`)
    const token = localStorage.getItem('customerToken')
    console.log(token)
    const config = {
          headers: {Authorization: `Bearer ${token}`}
    }

    const authenticate = async () => {
      return await httpManager.customerAuth(config)
    }
    
    authenticate()
    .then(response => {if(response['data']['responseCode'] === 200)

    console.log(`authenticated`)
    setAccount(response['data']['responseData'])
    console.log(response['data']['responseData'])
    })
  }, [])

  return (
    <RootStyle>
      <TalentNavbar onOpenSidebar={() => setOpen(true)} account={account}/>
      <TalentSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} account = {account}/>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
  
}
