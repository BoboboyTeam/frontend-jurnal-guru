import { configureStore } from '@reduxjs/toolkit';
import jurnalGuruReducer from './jurnalRedux';

const store = configureStore({
    reducer: {
        jurnalGuru: jurnalGuruReducer,
    }
});

export default store;