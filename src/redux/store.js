import { configureStore } from "@reduxjs/toolkit";
import abogadosReducer from './mainlayout/mainlayoutSlice'
import loginReducer from './login/loginSlice'
import userReducer  from './authenticate/userSlice'
import ticketsReducer from './tickets/ticketSlice'

const store = configureStore({
    
    reducer: {
        // list of reducers
        abogados: abogadosReducer,
        login: loginReducer,
        user: userReducer,
        tickets: ticketsReducer

    }
});

export default store;