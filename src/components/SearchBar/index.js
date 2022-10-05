import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
//import './styles.css'
import Input from '@mui/material/Input';
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { provinciasList } from "../../constants";
import { materiasList } from "../../constants";


const SearchBar = ({value, changeInput}) => {

    const [provincia, setProvincia] = useState('');
    const [materia, setMateria] = useState('');
    const [listaProvincias, SetListaProvincias] = useState(provinciasList)
    const [listaMaterias, setListaMaterias] = useState(materiasList)

    const handleChange = (event) => {
        setProvincia(event.target.value);
      };

    const handleChangeMateria = (event) => {
        setMateria(event.target.value)
    }
    

    return (
       
             <Box
                // sx={{
                // width: 300,
                // height: 300,
                // backgroundColor: 'primary.dark',
                // '&:hover': {
                //     backgroundColor: 'primary.main',
                //     opacity: [0.9, 0.8, 0.7],
                // },
                // }}
                fullWidth
                sx={{
                height: 300,
                }}
            >
            <SearchIcon className="searchBar-icon"/>
            <Input 
                type="text" 
                placeholder="Busca por especialidad" 
                value={value} 
                onChange={changeInput} 
            />

        <FormControl fullWidth>
            <InputLabel id="materia-select-label">Provincia</InputLabel>
            <Select
                labelId="materia-select-label"
                id="provincia-simple-select"
                value={provincia}
                label="Provincia"
                onChange={handleChange}
            >
                {provinciasList.map(provincia => <MenuItem value={provincia}>{provincia}</MenuItem>)
                }
            </Select>
        </FormControl>

        <FormControl fullWidth>
            <InputLabel id="materia-select-label">Especialidad</InputLabel>
            <Select
                labelId="materia-select-label"
                id="materia-simple-select"
                value={materia}
                label="materia"
                onChange={handleChangeMateria}
            >
                {materiasList.map(materia => <MenuItem value={materia}>{materia}</MenuItem>)
                }
            </Select>
        </FormControl>
    </Box>
        
    )}


export default SearchBar