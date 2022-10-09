import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
  } from '@mui/material';

import { useEffect, useState, useRef } from 'react';
import { httpManager } from '../../../managers/httpManager';
import CardMedia from '@mui/material/CardMedia';
  
export const AccountProfile = (props) => {

    const hiddenFileInput = useRef(null);
    const [values, setValues] = useState('')
    const [image, setImage] = useState()
    const [preview, setPreview] = useState();

    useEffect(() => {
      console.log(`Account details page useEffect`)
      const token = localStorage.getItem('customerToken')
      const config = {
            headers: {Authorization: `Bearer ${token}`}
      }
      const authenticate = async () => {
        return await httpManager.customerAuth(config)
      }    
      authenticate()
      .then(response => {
        if(response['data']['responseCode'] === 200)
        setValues(response['data']['responseData'])
       })
    }, [])

    useEffect(() => {
      if(image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(image);
      } else {
        setPreview(null)
      }
    }, [image])

    const handleUpdateImage = async (event) => {

      const promise = new Promise ( async (resolve, reject) => {
      console.log(image)
      console.log(image.type)
      const {data} = await httpManager.getPresignedUrl(image.name)   
      const pipe = {
          bucket: "myawsbucketwhatsapp",
          ...data.fields,
          'Content-Type':image.type ,
          file: image
      };
      const formData = new FormData();
      for (const name in pipe) {
          formData.append(name, pipe[name]);
      }
      const {status} = await httpManager.uploadFileFromBrowser(data.url, formData)
      console.log(status)
      if(status === 204) { 
        await httpManager.updateProfilePicture({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": values._id})
        resolve({"image": `https://d1d5i0xjsb5dtw.cloudfront.net/${image.name}`, "_id": values._id}) 
      } else {reject("error loading to S3")} 
  });

  promise.then((d) => {
      console.log(d)
    });
  }

  const handleClick = event => {
      hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    const file = event.target.files[0];
    if(file && file.type.substr(0,5) === "image") {
      setImage(file);
    } else {
      setImage(null)
    }
};

    return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {preview ? (
          <CardMedia
          component="img"
          height="200"
          image={preview}
          alt="Profile picture"
          />) : (<CardMedia
          component="img"
          height="200"
          image={values.image_url}
          alt="Profile picture"
          />)}
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {values.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${values.city}, ${values.province}`}
          </Typography>
          {/* <Typography
            color="textSecondary"
            variant="body2"
          >
            {user.timezone}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input 
          type="file" 
          ref={hiddenFileInput}
          style={{display:'none'}}
          accept="image/*"
          onChange={handleChange}     
        />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexGrow: "1",
            flexDirection: 'column'
          }}
        > 
        <Button
          color="primary"
          variant="text"
          onClick={handleClick}
        > 
        Cambiar de imagen
        </Button>
        {
        preview && (
        <Button
        color="primary"
        variant="text"
        onClick={(e) => handleUpdateImage(e)}
        > 
        Actualizar imagen
        </Button>
        )}
        </Box>
      </CardActions>
    </Card>)
};
  