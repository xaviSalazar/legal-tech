import PropTypes from 'prop-types';

// material
import { Box, Card, Link, Grid, Typography, Stack } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
// import { InsertEmoticonOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------




const MyImage = ({ name,  profileImage}) => (
      <LazyLoadImage
        alt={name}
        top= '0'
        width='100%'
        height='100%'
        object-fit= 'cover'
        position='absolute'
        src={profileImage} // use normal <img> attributes as props
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
            profileImage, 
            description, 
            email, 
            city, 
            province, 
            especialidad, 
            phoneNumber,
            rating, 
            id } = details;
    
    const handleFunction = (e) => {
                console.log(details)
            }
        
    
    return (

        
        <Card sx={{ flexGrow: '1'}}  >
            {/* <Box sx={{pt: '100%', position: 'relative'}}> */}
                {/* <MyImage name={name} profileImage={profileImage} handleFunction={handleFunction}/> */}
                {/* <ProductImgStyle alt={name} src={profileImage} /> */}
            {/* </Box> */}
            <CardActionArea onClick={e => handleClickOpen(e)}>
            <Grid container spacing={3} >

            <Grid item sm={3} md={3}>
            <Avatar sx={{ width: 150, height: 150 }}>
            <MyImage name={name} profileImage={profileImage}/>
            </Avatar>
            <Stack spacing={2} sx={{ p:1 }}>
            <Typography variant="subtitle1" noWrap>
                {email}
            </Typography>
            <Typography variant="subtitle1" noWrap>
                {phoneNumber}
            </Typography>
            </Stack>

            </Grid>


            <Grid item sm={9} md={9}>
            <Stack spacing={2} sx={{ p:1 }}>
                <Typography variant="h4" noWrap>
                {name}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {
                        especialidad.map((item, index) => <Typography key={index} variant="h5">{item}</Typography>)
                    }
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1">
                    {/* <Typography
                    component="span"
                    variant="body1"
                    sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                    }}
                    > */}
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
                    {rating}
                </Typography>
                </Stack>
                
            </Stack>
            </Grid>
            </Grid>

            </CardActionArea>
        </Card>
    );
}
  