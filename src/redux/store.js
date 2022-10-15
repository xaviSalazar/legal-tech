import { configureStore } from "@reduxjs/toolkit";
import abogadosReducer from './mainlayout/mainlayoutSlice'

const store = configureStore({
    
    reducer: {
        // list of reducers
        abogados: abogadosReducer


    }
});

export default store;