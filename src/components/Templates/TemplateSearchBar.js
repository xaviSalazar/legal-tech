import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
  } from '@mui/material';
  import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



 const TemplateSearchBar = () => {
 return (
 <Box sx={{ mt: 3 }}>
 <Card>
   <CardContent>
     <Box sx={{ maxWidth: 500 }}>
       <TextField
         fullWidth
         InputProps={{
           startAdornment: (
             <InputAdornment position="start">
               <SvgIcon
                 color="action"
                 fontSize="small"
               >
                 <SearchOutlinedIcon />
               </SvgIcon>
             </InputAdornment>
           )
         }}
         placeholder="Buscar documento"
         variant="outlined"
       />
     </Box>
   </CardContent>
 </Card>
</Box>
    )
};

export default TemplateSearchBar