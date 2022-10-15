import { configureStore } from "@reduxjs/toolkit";
import abogadosReducer from './mainlayout/mainlayoutSlice'
import loginReducer from './login/loginSlice'

const store = configureStore({
    
    reducer: {
        // list of reducers
        abogados: abogadosReducer,
        login: loginReducer


    }
});

export default store;