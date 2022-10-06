import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';
import Header from '../components/TalentPage/Header'

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function TalentPage() {
  return (
    <Page title="Talent page">
      {/* <Container> */}
      <Header />
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
          Pagina TALENTO
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
           Pagina TALENTO
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </ContentStyle>
      {/* </Container> */}
    </Page>
  );
}
