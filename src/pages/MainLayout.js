import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import SearchBar from '../components/SearchBar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AbogadoCardList from '../components/AbogadoCardList'
import { abogadosList } from '../constants';
import EmptyView from '../components/EmptyView'
// import FeaturedPost from './FeaturedPost';
// import Main from './Main';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import { List } from '@mui/material';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Economiza tiempo y dinero con el mejor abogado',
  description:
    "Olvida las filas largas, el pagar mucho por un documento y sobretodo tramites mal manejados.",
  image: 'https://www.gob.mx/cms/uploads/action_program/main_image/11638/post_03.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

// const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MainLayout() {
  // Variables to set the search values
  const [provincia, setProvincia] = useState('');
  const [materia, setMateria] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [list, setList] = useState(abogadosList);
  const [resultFound, setResultFound] = useState(false)

  const handleInputClearClick = ()=> {
    setInputValue('')
  }

  const handleMateriaClearClick = () => {
    setMateria('')
  }

  const handleProvinciaClearClick = () => {
    setProvincia('')
  }

  const applyFilters = () => {

    let updatedList = abogadosList

    if(provincia) {
        updatedList = updatedList.filter(item => item.province.toLowerCase().trim() === provincia.toLowerCase().trim())
    }

    if(materia) {
      updatedList = updatedList.filter(item => item.especialidad.includes(materia))
    }

    setList(updatedList)

    !updatedList.length ? setResultFound(false) : setResultFound(true); 
  }


  useEffect(() => {

    applyFilters()

  },[provincia, materia])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Grid Box spacing={2}>
        <Grid item xs={12} lg = {12}>
          <Header title="Abogado Directo" sections={sections} />
          <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        </Grid>
        <Box
                sx={{
                height: 250,
                p:2,
                position: '-webkit-sticky',
                position: 'sticky',
                top: 0,
                }}
            >
        <Grid item xs={12}lg={12}>
        <SearchBar
          inputValue={inputValue}
          changeInput={e => setInputValue(e.target.value)}
          handleInputClearClick={handleInputClearClick}
          provincia={provincia}
          handleChangeProvincia={e => setProvincia(e.target.value)}
          handleProvinciaClearClick={handleProvinciaClearClick}
          materia = {materia}
          handleChangeMateria = {e => setMateria(e.target.value)}
          handleMateriaClearClick={handleMateriaClearClick}
        />
        </Grid>
         </Box>
        
        <Grid item xs={12} lg={12}>
          {resultFound ? <AbogadoCardList details = {list}/> : <EmptyView/>}
        </Grid>
        
      </Grid>
      </Box>
      {/* <Container >
        hola
        <Header title="Abogado Directo" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}
