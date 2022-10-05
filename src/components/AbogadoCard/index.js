import PropTypes from 'prop-types';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
import { InsertEmoticonOutlined } from '@mui/icons-material';
// ----------------------------------------------------------------------

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

  export default function AbogadoCard({ details }) {

    // console.log(details)

    const { name, 
            profileImage, 
            description, 
            email, 
            city, 
            province, 
            especialidad, 
            rating } = details;
    
    return (
        <Card>
            <Box sx={{pt: '100%', position: 'relative'}}>
                <ProductImgStyle alt={name} src={profileImage} />
            </Box>

            <Stack spacing={2} sx={{ p:3 }}>
                <Typography variant="subtitle1" noWrap>
                {name}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {
                        especialidad.map(item => <Typography variant="subtitle2">{item}</Typography>)
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

            </Stack>
        </Card>
    );
}
  