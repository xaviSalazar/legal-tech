import { useState, useEffect } from "react";
import AbogadoCardList from "../AbogadoCardList";
import SearchBar from "../SearchBar";
import { httpManager } from "../../managers/httpManager";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import EmptyView from '../EmptyView'


const SearcherAbogado = ({list, setList}) => {
    const [provincia, setProvincia] = useState('');
    const [materia, setMateria] = useState('');
    const [abogadosList, setAbogadosList] = useState([]);
    const [resultFound, setResultFound] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [abogadoCard, setAbogadoCard] = useState('')

    useEffect(() => {
        const getAbogados = async () => {
          return await httpManager.retrieveUsers()
        }    
        getAbogados()
        .then(response => {
          if(response['data']['responseCode'] === 200)
            setList(response['data']['responseData'])
            setAbogadosList(response['data']['responseData'])
            console.log(response['data']['responseData'])
          // setValues(response['data']['responseData'])
         })
    
      }, [])

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
          updatedList = updatedList.filter(item => item.subjects.includes(materia))
        }
    
        setList(updatedList)
    
        !updatedList.length ? setResultFound(false) : setResultFound(true); 
      }

    useEffect(() => {

        applyFilters()
    
    },[provincia, materia, abogadosList])

    return (
            <Box
            sx={{
            height: 250,
            p:2,
            position: '-webkit-sticky',
            position: 'sticky',
            top: 0,
            }}
            >
            <Grid Box spacing={2}>
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
            <Grid item xs={12} lg={12}>
            {resultFound ? <AbogadoCardList abogadoCard={abogadoCard} setAbogadoCard={setAbogadoCard} setList={setList} details = {list}/> : <EmptyView/>}
            </Grid>
            </Grid>
            </Box>
    )
}


export default SearcherAbogado;