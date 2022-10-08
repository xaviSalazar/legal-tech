import { TextField, Grid, Box} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


function getStyles(name, materia, theme) {
    return {
      fontWeight:
      materia.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  
  
  function MultipleSelectChip(materia, setMateria, handleChangeEspecialidad) {
  
    const names = [
      "Derecho Administrativo",
      "Derecho Penal",
      "Derecho Constitucional",
      "Derecho Procesal",
      "Derecho Ambiental",
      "Derecho Laboral",
      "Derecho Civil",
      "Derecho de Familia",
      "Derecho Tributario",
      "Transito",
      "Derecho Coorporativo",
      "Derecho Sucesorio",
      "Derecho Mercantil",
      "Derecho Internacional Privado",
      "Derecho Internacional Publico" 
      ]
  
    const theme = useTheme();
    // const [especialidad, setEspecialidad] = React.useState([]);
  
 
  
    return (
        <FormControl sx={{ m: 1, width: 600 }}>
          <InputLabel id="demo-multiple-chip-label">Elige 3 especialidades</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={materia}
            onChange={handleChangeEspecialidad}
            input={<OutlinedInput id="select-multiple-chip" label="Elige 3 especialidades" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value}/>
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, materia, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
    );
  }
  



export default function HelperRegisterForm({handleChange, 
                            handleWorkSelect, 
                            handlePhoneChange, 
                            values, 
                            checked,
                            handleChangeEspecialidad,
                            materia,
                            setMateria}) { 


    const {userMod} = values

    return (
                
         userMod === "Abogado" ?
        <>
            <Grid
                item
                md={12}
                xs={12}
            >
            <MuiPhoneNumber 
            required
            id="Celular"
            name="phoneNumber"
            label="Numero de Celular"
            defaultCountry='ec' 
            sx={{
                '& .MuiPhoneNumber-flagButton': {
                    maxWidth: '10px' ,
                }
            }}
            onChange={handlePhoneChange}
            />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    fullWidth
                    label="Profesion (Senescyt)"
                    name="career"
                    onChange={handleChange}
                    required
                    value={values.career}
                    variant="outlined"
                />
            </Grid>
            { MultipleSelectChip(materia,setMateria, handleChangeEspecialidad)}
            {/* EDUCACION */}
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    fullWidth
                    label="Educacion"
                    name="education"
                    onChange={handleChange}
                    required
                    value={values.education}
                    variant="outlined"
                />
            </Grid>
            {/* LUGAR DE TRABAJO */}
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    fullWidth
                    label="Lugar de trabajo"
                    name="work"
                    onChange={handleChange}
                    value={values.work}
                    variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    fullWidth
                    label="Cuentanos sobre ti (200 caracteres max)"
                    name="description"
                    onChange={handleChange}
                    multiline={true}
                    required
                    value={values.description}
                    inputProps={{ maxLength: 200 }}
                    variant="outlined"
                />
            </Grid>
            <Grid
                item
                md={12}
                xs={12}
            >
                <TextField
                    id="outlinednumber"
                    label="Costo por primera consulta"
                    name="appointmentCost"
                    type="number"
                    required
                    onChange={handleChange}
                    value={values.appointmentCost}
                    InputProps={{
                        startAdornment:
                            <InputAdornment position="start">$</InputAdornment>,
                        // shrink: true,
                    }}
                />
            </Grid>
            <FormControlLabel
                value="top"
                control={<Checkbox
                    name="remoteWork"
                    checked={checked}
                    onChange={handleWorkSelect}
                />}
                label="¿Haces teleconsulta?"
                labelPlacement="top"
            /> </> : null
    );

}
