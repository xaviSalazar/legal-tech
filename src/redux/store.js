import { configureStore } from "@reduxjs/toolkit";
import abogadosReducer from './mainlayout/mainlayoutSlice'
import loginReducer from './login/loginSlice'
import userReducer  from './authenticate/userSlice'

const store = configureStore({
    
    reducer: {
        // list of reducers
        abogados: abogadosReducer,
        login: loginReducer,
        user: userReducer
    }
});

export default store;