import { Box, Container } from '@mui/material';
import { TemplatesListTable } from '../components/Templates/TemplatesListTable';
import TemplateSearchBar from '../components/Templates/TemplateSearchBar';

const Templates = () => {

    return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
            <TemplateSearchBar />
          <Box sx={{ mt: 3 }}>
            <TemplatesListTable />
          </Box>
        </Container>
      </Box>
    </>
    )
  };


  export default Templates;