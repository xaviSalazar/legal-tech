import PropTypes from 'prop-types';

// material
import { Box, Card, Link, Grid, Typography, Stack } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
// import { InsertEmoticonOutlined } from '@mui/icons-material';
import Label from '../Label';

// ----------------------------------------------------------------------




const MyImage = ({ name,  image_url}) => (
      <LazyLoadImage
        alt={name}
        top= '0'
        width='100%'
        height='100%'
        object-fit= 'cover'
        position='absolute'
        src={image_url} // use normal <img> attributes as props
        />
  );

const ProductImgStyle = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  AbogadoCard.propTypes = {
    details: PropTypes.object,
  };

  export default function AbogadoCard({ details , setOpen, setAbogadoCard}) {

  

    const handleClickOpen = (e) => {
        setOpen(true);
        setAbogadoCard(details)
        console.log(details)
      };

    const { name, 
            image_url, 
            description, 
            email, 
            city, 
            province, 
            phoneNumber,
            subjects,
            rating, 
            appointmentCost,
            id } = details;

    
    const handleFunction = (e) => {
                console.log(details)
            }
        
    
    return (

        
        <Card sx={{ flexGrow: '1'}}  >
            {/* <Box sx={{pt: '100%', position: 'relative'}}> */}
                {/* <MyImage name={name} image_url={image_url} handleFunction={handleFunction}/> */}
                {/* <ProductImgStyle alt={name} src={image_url} /> */}
            {/* </Box> */}
            <CardActionArea onClick={e => handleClickOpen(e)}>
            <Grid container spacing={3} >

            <Grid item sm={4} md={4}>
            <Avatar sx={{ width: 150, height: 150 }}>
            <MyImage name={name} image_url={image_url}/>
            </Avatar>
            <Stack spacing={1} sx={{ p:1 }}>
            <Typography variant="subtitle1" noWrap>
                {email}
            </Typography>
            <Typography variant="subtitle1" noWrap>
                {phoneNumber}
            </Typography>
            <Typography variant="subtitle1" noWrap>
                {`Consulta: ${appointmentCost} USD`}
            </Typography>
            </Stack>
            </Grid>
            <Grid item sm={8} md={8}>
            <Stack spacing={2} sx={{ p:1 }}>
                <Typography variant="h4" noWrap>
                {name}
                </Typography>
                <Stack direction="row" justify-content="space-around"  >
                    {      
                        // subjects?.map((item, index) => <Typography key={index} variant="h5">{item}</Typography>)
                        subjects?.map((item, index) =>  <Label key={index} variant="ghost" color={'success'}>{item}</Label>)
                    }
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                {/* <Typography variant="subtitle1"> */}
                    <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{
                        textDecoration: 'none',
                    }}
                    >
                    {`${city}, ${province}`}
                    {/* </Typography> */}
                </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" >
                <Typography variant="subtitle1">
                   {`RESENAS   `}
                </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" >
                <Typography variant="body1">
                    {`rating`}
                    
                </Typography>
                </Stack>
                
            </Stack>
            </Grid>
            </Grid>

            </CardActionArea>
        </Card>
    );
}
  