import { configureStore } from '@reduxjs/toolkit';
import jurnalGuruReducer from './jurnalRedux';
import kelasReducer from './kelasRedux';
import guruReducer from './guruRedux';
import mapelReducer from './mapelRedux';
const store = configureStore({
    reducer: {
        jurnalGuru: jurnalGuruReducer,
        guru: guruReducer,
        kelas: kelasReducer,
        mapel: mapelReducer,
    }
});

export default store;