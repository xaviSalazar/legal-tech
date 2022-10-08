// import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { AccountProfile } from '../components/Account/AccountProfile';
import { AccountProfileDetails } from '../components/Account/AccountProfileDetails';


const Account = () => {

    useEffect(() => {
      console.log(`useEffect Account page`)
    }, [])

    return (
 
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
 )}


export default Account;
