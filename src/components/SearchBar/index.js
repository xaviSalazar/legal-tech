import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
//import './styles.css'
import Input from '@mui/material/Input';
import { Box, IconButton } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { provinciasList } from "../../constants";
import { materiasList } from "../../constants";
import ClearIcon from '@mui/icons-material/Clear';


const SearchBar = ({
        inputValue, 
        changeInput,
        handleInputClearClick,
        provincia,
        handleChangeProvincia,
        handleProvinciaClearClick,
        materia,
        handleChangeMateria,
        handleMateriaClearClick}) => {

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
                placeholder="Buscador" 
                value={inputValue} 
                endAdornment= {<IconButton sx={{visibility: inputValue?"visible":"hidden"}} onClick={handleInputClearClick}><ClearIcon/></IconButton>}
                onChange={changeInput} 
            />

        <FormControl fullWidth>
            <InputLabel id="materia-select-label">Provincia</InputLabel>
            <Select
                labelId="materia-select-label"
                id="provincia-simple-select"
                value={provincia}
                label="Provincia"
                onChange={handleChangeProvincia}
                endAdornment= {<IconButton sx={{visibility: provincia?"visible":"hidden"}} onClick={handleProvinciaClearClick}><ClearIcon/></IconButton>}
            >
                {provinciasList.map((provincia, index) => 
                                <MenuItem key = {index} value={provincia}>{provincia}</MenuItem>)}
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
                endAdornment= {<IconButton sx={{visibility: materia?"visible":"hidden"}} onClick={handleMateriaClearClick}><ClearIcon/></IconButton>}
            >
                {materiasList.map((materia,index) => 
                                <MenuItem key={index} value={materia}>{materia}</MenuItem>)
                }
            </Select>
        </FormControl>
    </Box>
        
    )}


export default SearchBar