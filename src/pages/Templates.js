import { Box, Container } from '@mui/material';
import { TemplatesListTable } from '../components/Templates/TemplatesListTable';
import TemplateSearchBar from '../components/Templates/TemplateSearchBar';
import { useState, useEffect } from 'react';
import { httpManager } from '../managers/httpManager';

const Templates = () => {

  const [account, setAccount] = useState('')

  useEffect(() => {
    console.log(`Client page useEffect`)
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
    setAccount(response['data']['responseData'])
    console.log(response['data']['responseData'])
    })
  }, [])

    return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={false}>
            <TemplateSearchBar />
          <Box sx={{ mt: 1 }}>
            <TemplatesListTable userDetails={account}/>
          </Box>
        </Container>
      </Box>
    </>
    )
  };


  export default Templates;