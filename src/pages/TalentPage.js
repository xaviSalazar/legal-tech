import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import TalentNavbar from '../components/TalentPage/NavBar'
import TalentSidebar from '../components/TalentPage/SiderBar';
// redux
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../redux/authenticate/userAction';

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
  const dispatch = useDispatch();
  // const [account, setAccount] = useState("")

  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  return (
    <RootStyle>
      <TalentNavbar onOpenSidebar={() => setOpen(true)}/>
      <TalentSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
  
}
